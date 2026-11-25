"""
Cắt font Material Symbols chỉ còn các icon thật sự dùng trong app.

Font gốc (src/fonts/MaterialSymbolsOutlined.ttf, ~950KB) được giữ làm nguồn.
App chỉ tải bản đã cắt src/fonts/MaterialSymbolsOutlined-subset.woff2 (~40KB).

Chạy lại script này mỗi khi dùng icon mới (trong code, seed hoặc icon chủ đề):
    pip install fonttools brotli
    python3 scripts/subset-material-symbols.py .
"""
import re, os, sys
from fontTools.ttLib import TTFont
from fontTools import subset

root = sys.argv[1]
src_font = os.path.join(root, "src/fonts/MaterialSymbolsOutlined.ttf")
f = TTFont(src_font)
cmap = f.getBestCmap()
rev = {g: chr(c) for c, g in cmap.items()}

# Ligature table: icon name -> ligature glyph
ligs = {}
for lookup in f["GSUB"].table.LookupList.Lookup:
    for st in lookup.SubTable:
        st = st.ExtSubTable if lookup.LookupType == 7 else st
        if not hasattr(st, "ligatures"):
            continue
        for first, entries in st.ligatures.items():
            for lig in entries:
                comps = [first] + list(lig.Component)
                if all(c in rev for c in comps):
                    ligs["".join(rev[c] for c in comps)] = lig.LigGlyph
print("ligatures in font:", len(ligs))

# Every identifier-like token in source + seed scripts (string literals,
# JSX text, ternaries...). Over-including is cheap; missing an icon is not.
tokens = set()
for base in ("src", "scripts", "prisma"):
    for dp, dn, fn in os.walk(os.path.join(root, base)):
        if "generated" in dp:
            continue
        for name in fn:
            if name.endswith((".ts", ".tsx", ".sql", ".css")):
                text = open(os.path.join(dp, name), encoding="utf8", errors="ignore").read()
                tokens.update(re.findall(r"[a-z0-9_]+", text))
used = sorted(t for t in tokens if t in ligs)
print("icons kept:", len(used))

chars = set("".join(used))
glyphs = {ligs[n] for n in used} | {cmap[ord(c)] for c in chars if ord(c) in cmap}
glyphs |= {".notdef", "space"} & set(f.getGlyphOrder())

opts = subset.Options()
opts.layout_features = ["rlig", "liga"]
opts.layout_closure = False      # không kéo theo mọi ligature khác
opts.flavor = "woff2"
opts.name_IDs = ["*"]
opts.notdef_outline = True
sub = subset.Subsetter(opts)
sub.populate(glyphs=sorted(glyphs))
f2 = TTFont(src_font)
sub.subset(f2)
out = os.path.join(root, "src/fonts/MaterialSymbolsOutlined-subset.woff2")
f2.flavor = "woff2"
f2.save(out)
print("glyphs:", len(f2.getGlyphOrder()), "size KB:", os.path.getsize(out) // 1024)

# Verify every kept icon still forms its ligature in the subset
f3 = TTFont(out)
cmap3 = f3.getBestCmap(); rev3 = {g: chr(c) for c, g in cmap3.items()}
ok = set()
for lookup in f3["GSUB"].table.LookupList.Lookup:
    for st in lookup.SubTable:
        st = st.ExtSubTable if lookup.LookupType == 7 else st
        for first, entries in getattr(st, "ligatures", {}).items():
            for lig in entries:
                ok.add("".join(rev3[c] for c in [first] + list(lig.Component)))
missing = [n for n in used if n not in ok]
print("missing after subset:", missing)
