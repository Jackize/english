import { w } from "./helpers";
import type { SeedVocabTopic } from "../curriculum-data";

/** Chủ đề 16: Thời trang & quần áo. */
export const TOPIC_16: SeedVocabTopic = {
  name: "Thời trang & quần áo",
  slug: "thoi-trang-quan-ao",
  icon: "checkroom",
  description:
    "Từ vựng về trang phục, phụ kiện, chất liệu, cách giặt ủi và xu hướng thời trang.",
  lessons: [
    {
      title: "Quần áo & phụ kiện",
      summary:
        "20 từ/cụm từ về các món đồ mặc hằng ngày, giày dép và phụ kiện trang sức.",
      sections: [
        {
          title: "Trang phục cơ bản",
          body: `- **outfit**: bộ trang phục phối sẵn
- **garment**: quần áo (trang trọng)
- **blouse / sweater**: áo sơ mi nữ / áo len
- **cardigan / hoodie / jumper**: áo len cài khuy / áo hoodie / áo len
- **scarf / gloves / belt**: khăn quàng / găng tay / thắt lưng

Mẫu câu:
- She wore a simple **outfit** to the interview.
- Take a **scarf** — it's cold outside.`,
          remember: "jumper (Anh) và sweater (Mỹ) đều là áo len.",
        },
        {
          title: "Giày dép và phụ kiện",
          body: `- **boots / sandals / trainers**: ủng / dép quai hậu / giày thể thao
- **socks / cap**: tất / mũ lưỡi trai
- **necklace / bracelet**: dây chuyền / vòng tay
- **earrings / ring**: khuyên tai / nhẫn
- **sunglasses**: kính râm

Mẫu câu:
- These **trainers** are comfortable for walking.
- He bought her a silver **necklace**.`,
          remember: "trainers (Anh) = sneakers (Mỹ): giày thể thao.",
        },
      ],
      words: [
        w("outfit", "/ˈaʊtfɪt/", "n", "bộ trang phục", "a set of clothes worn together", "She chose a smart outfit for the party."),
        w("garment", "/ˈɡɑːmənt/", "n", "quần áo (trang trọng)", "a piece of clothing", "The label is sewn inside the garment."),
        w("blouse", "/blaʊz/", "n", "áo sơ mi nữ", "a woman's shirt", "She wore a white blouse to work."),
        w("sweater", "/ˈswetə(r)/", "n", "áo len", "a warm piece of clothing for the upper body", "I need a thicker sweater for winter."),
        w("cardigan", "/ˈkɑːdɪɡən/", "n", "áo len cài khuy", "a knitted jacket that fastens at the front", "My grandmother knitted me a cardigan."),
        w("hoodie", "/ˈhʊdi/", "n", "áo hoodie", "a sweatshirt with a hood", "He wears a hoodie and jeans most days."),
        w("jumper", "/ˈdʒʌmpə(r)/", "n", "áo len (Anh)", "a warm knitted piece of clothing", "Put on a jumper if you feel cold."),
        w("scarf", "/skɑːf/", "n", "khăn quàng", "a piece of cloth worn around the neck", "She wrapped a scarf around her neck."),
        w("gloves", "/ɡlʌvz/", "n", "găng tay", "coverings for the hands", "Wear gloves when you clean the garden."),
        w("belt", "/belt/", "n", "thắt lưng", "a strap worn around the waist", "His belt matched his shoes."),
        w("boots", "/buːts/", "n", "ủng, bốt", "shoes that cover the foot and ankle", "These boots are perfect for rainy days."),
        w("sandals", "/ˈsændlz/", "n", "dép quai hậu", "open shoes with straps", "She wears sandals in summer."),
        w("trainers", "/ˈtreɪnəz/", "n", "giày thể thao", "shoes worn for sport or casual wear", "My trainers are covered in mud."),
        w("socks", "/sɒks/", "n", "tất, vớ", "soft coverings for the feet", "I bought three pairs of socks."),
        w("cap", "/kæp/", "n", "mũ lưỡi trai", "a soft hat with a curved front part", "He always wears a baseball cap."),
        w("necklace", "/ˈnekləs/", "n", "dây chuyền", "jewellery worn around the neck", "The necklace belonged to her mother."),
        w("bracelet", "/ˈbreɪslət/", "n", "vòng tay", "jewellery worn around the wrist", "He gave her a gold bracelet."),
        w("earrings", "/ˈɪərɪŋz/", "n", "khuyên tai", "jewellery worn on the ears", "She took off her earrings before bed."),
        w("ring", "/rɪŋ/", "n", "nhẫn", "a circular piece of jewellery for a finger", "He wore a silver ring on his little finger."),
        w("sunglasses", "/ˈsʌnɡlɑːsɪz/", "n", "kính râm", "dark glasses that protect the eyes from the sun", "Don't forget your sunglasses at the beach."),
      ],
    },
    {
      title: "Vừa vặn & chọn cỡ",
      summary:
        "20 từ/cụm từ về kích cỡ, cảm giác khi mặc, phong cách ăn mặc và sửa quần áo.",
      sections: [
        {
          title: "Kích cỡ và độ vừa",
          body: `- **fit**: vừa vặn
- **suit**: hợp với
- **size / medium**: kích cỡ / cỡ trung bình
- **tight / loose**: bó sát / rộng
- **baggy**: rộng thùng thình

Mẫu câu:
- This jacket doesn't **fit** me.
- Do you have these in a **medium**?`,
          remember: "fit nói về kích thước; suit nói về việc hợp phong cách hoặc hợp dáng.",
        },
        {
          title: "Phong cách ăn mặc",
          body: `- **fashionable / trendy**: hợp thời trang / sành điệu
- **outdated**: lỗi thời
- **casual / formal**: thường ngày / trang trọng
- **smart / matching**: lịch sự / đồng bộ
- **alter / tailor**: sửa quần áo / thợ may
- **measure / sleeve / collar / button**: đo / tay áo / cổ áo / cúc áo

Mẫu câu:
- The dress code is **smart casual**.
- The **tailor** altered the trousers for me.`,
          remember: "smart trong thời trang nghĩa là lịch sự, gọn gàng.",
        },
      ],
      words: [
        w("fit", "/fɪt/", "v/n", "vừa vặn", "to be the right size or shape", "These jeans fit perfectly."),
        w("suit", "/suːt/", "v/n", "hợp; bộ com-lê", "to look good on someone", "That colour really suits you."),
        w("size", "/saɪz/", "n", "kích cỡ", "how big or small something is", "What size are those shoes?"),
        w("medium", "/ˈmiːdiəm/", "adj/n", "cỡ trung bình", "a size between small and large", "I usually take a medium."),
        w("tight", "/taɪt/", "adj", "bó sát", "fitting closely to the body", "These trousers are too tight."),
        w("loose", "/luːs/", "adj", "rộng", "not fitting closely", "She prefers loose clothing in summer."),
        w("baggy", "/ˈbæɡi/", "adj", "rộng thùng thình", "very loose and hanging loosely", "He wears baggy jeans and a cap."),
        w("fashionable", "/ˈfæʃnəbl/", "adj", "hợp thời trang", "popular at a particular time", "That style is very fashionable now."),
        w("trendy", "/ˈtrendi/", "adj", "sành điệu", "very fashionable", "They opened a trendy new coffee shop."),
        w("outdated", "/ˌaʊtˈdeɪtɪd/", "adj", "lỗi thời", "no longer fashionable", "The jacket looks a bit outdated."),
        w("casual", "/ˈkæʒuəl/", "adj", "thường ngày", "relaxed and not formal", "You can wear casual clothes to the picnic."),
        w("formal", "/ˈfɔːml/", "adj", "trang trọng", "following official or traditional rules of dress", "A formal suit is required for the dinner."),
        w("smart", "/smɑːt/", "adj", "lịch sự, gọn gàng", "clean and well dressed", "He looked smart in his new shirt."),
        w("matching", "/ˈmætʃɪŋ/", "adj", "đồng bộ", "having the same colour or pattern", "They wore matching jackets."),
        w("alter", "/ˈɔːltə(r)/", "v", "sửa quần áo", "to change the size or shape of clothing", "The shop altered the dress for free."),
        w("tailor", "/ˈteɪlə(r)/", "n", "thợ may", "a person who makes or repairs clothes", "The tailor made him a suit."),
        w("measure", "/ˈmeʒə(r)/", "v", "đo", "to find the size of something", "The assistant measured my waist."),
        w("sleeve", "/sliːv/", "n", "tay áo", "the part of a garment that covers the arm", "The sleeves are too long for me."),
        w("collar", "/ˈkɒlə(r)/", "n", "cổ áo", "the part of a shirt around the neck", "His collar was too tight."),
        w("button", "/ˈbʌtn/", "n", "cúc áo", "a small round object used to fasten clothes", "A button fell off my coat."),
      ],
    },
    {
      title: "Chất liệu & giặt ủi",
      summary:
        "20 từ/cụm từ về vải, đặc tính chất liệu và cách bảo quản quần áo.",
      sections: [
        {
          title: "Các loại vải",
          body: `- **fabric**: vải
- **cotton / wool**: bông / len
- **silk / leather**: lụa / da
- **denim / linen**: vải bò / vải lanh
- **polyester / waterproof**: vải tổng hợp / chống nước

Mẫu câu:
- This shirt is made of **cotton**.
- The bag is real **leather**.`,
          remember: "wool là len; woollen là tính từ chỉ đồ làm từ len.",
        },
        {
          title: "Bảo quản quần áo",
          body: `- **crease / stain**: nếp nhăn / vết bẩn
- **shrink / fade**: co lại / phai màu
- **detergent / bleach**: nước giặt / thuốc tẩy
- **hang / hanger**: treo / móc treo
- **dry-clean / mend / stitch**: giặt khô / vá / khâu

Mẫu câu:
- Wash dark colours separately so they don't **fade**.
- Hang the shirt on a **hanger**.`,
          remember: "dry-clean là giặt khô, không dùng nước.",
        },
      ],
      words: [
        w("fabric", "/ˈfæbrɪk/", "n", "vải", "cloth used for making clothes", "The fabric feels very soft."),
        w("cotton", "/ˈkɒtn/", "n", "bông, vải cotton", "a natural cloth made from a plant", "Cotton is comfortable in hot weather."),
        w("wool", "/wʊl/", "n", "len", "the soft hair of sheep, used for clothes", "This coat is made of wool."),
        w("silk", "/sɪlk/", "n", "lụa", "a smooth, expensive cloth", "She wore a silk scarf."),
        w("leather", "/ˈleðə(r)/", "n", "da", "material made from animal skin", "He bought a leather jacket."),
        w("denim", "/ˈdenɪm/", "n", "vải bò", "strong cotton cloth used for jeans", "Denim jeans are popular everywhere."),
        w("linen", "/ˈlɪnɪn/", "n", "vải lanh", "a light cloth made from flax", "Linen shirts are cool in summer."),
        w("polyester", "/ˌpɒliˈestə(r)/", "n", "vải tổng hợp", "a strong artificial fabric", "The sports shirt is made of polyester."),
        w("waterproof", "/ˈwɔːtəpruːf/", "adj", "chống nước", "not letting water through", "Take a waterproof jacket."),
        w("crease", "/kriːs/", "n/v", "nếp nhăn; làm nhăn", "a line made by folding cloth", "There was a crease in his trousers."),
        w("stain", "/steɪn/", "n", "vết bẩn", "a dirty mark that is difficult to remove", "There is a coffee stain on my shirt."),
        w("shrink", "/ʃrɪŋk/", "v", "co lại", "to become smaller", "Wool can shrink in hot water."),
        w("fade", "/feɪd/", "v", "phai màu", "to lose colour", "The curtains faded in the sun."),
        w("detergent", "/dɪˈtɜːdʒənt/", "n", "nước giặt", "a liquid or powder used for washing clothes", "Add a small amount of detergent."),
        w("bleach", "/bliːtʃ/", "n/v", "thuốc tẩy; tẩy trắng", "a chemical used to make things white", "Don't use bleach on coloured clothes."),
        w("hang", "/hæŋ/", "v", "treo", "to put clothes on a hook or line", "Hang your wet coat by the door."),
        w("hanger", "/ˈhæŋə(r)/", "n", "móc treo", "a shaped object for hanging clothes", "Put the dress on a hanger."),
        w("dry-clean", "/ˌdraɪ ˈkliːn/", "v", "giặt khô", "to clean clothes with chemicals, not water", "This suit must be dry-cleaned."),
        w("mend", "/mend/", "v", "vá", "to repair a hole in clothing", "She mended the hole in his sock."),
        w("stitch", "/stɪtʃ/", "n/v", "mũi khâu; khâu", "a line of thread joining cloth", "The seam needs a few stitches."),
      ],
    },
    {
      title: "Xu hướng & phong cách",
      summary:
        "20 từ/cụm từ về thương hiệu, sàn diễn, phong cách cá nhân và thời trang bền vững.",
      sections: [
        {
          title: "Thời trang và xu hướng",
          body: `- **fashion / trend**: thời trang / xu hướng
- **brand / designer label**: thương hiệu / nhãn thiết kế
- **catwalk / model**: sàn diễn / người mẫu
- **accessory**: phụ kiện
- **vintage / retro**: đồ cổ điển / phong cách cổ

Mẫu câu:
- This **trend** started on social media.
- The **model** walked down the **catwalk**.`,
          remember: "brand là thương hiệu; label là nhãn gắn trên sản phẩm.",
        },
        {
          title: "Phong cách và lựa chọn bền vững",
          body: `- **elegant / stylish**: thanh lịch / sành điệu
- **bold / plain**: táo bạo / trơn
- **patterned / striped / floral**: có hoa văn / sọc / hoa
- **trendsetter**: người dẫn đầu xu hướng
- **thrift shop / timeless / attire**: cửa hàng đồ cũ / vượt thời gian / trang phục

Mẫu câu:
- She prefers **plain** clothes to **patterned** ones.
- Buying second-hand helps you shop more **sustainably**.`,
          remember: "trendsetter là người tạo ra xu hướng, không phải người chạy theo.",
        },
      ],
      words: [
        w("fashion", "/ˈfæʃn/", "n", "thời trang", "the popular style of clothes", "She works in the fashion industry."),
        w("trend", "/trend/", "n", "xu hướng", "a general direction in which something changes", "Short jackets are the latest trend."),
        w("brand", "/brænd/", "n", "thương hiệu", "a company's name on a product", "He only buys well-known brands."),
        w("catwalk", "/ˈkætwɔːk/", "n", "sàn diễn thời trang", "the long stage models walk on", "The models walked down the catwalk."),
        w("model", "/ˈmɒdl/", "n", "người mẫu", "a person who wears clothes for photos or shows", "She became a model at nineteen."),
        w("accessory", "/əkˈsesəri/", "n", "phụ kiện", "an extra item worn with clothes", "A belt is a useful accessory."),
        w("vintage", "/ˈvɪntɪdʒ/", "adj", "đồ cổ điển", "old but valuable or fashionable", "She collects vintage dresses."),
        w("retro", "/ˈretrəʊ/", "adj", "phong cách cổ", "copying the style of the past", "The café has a retro design."),
        w("elegant", "/ˈelɪɡənt/", "adj", "thanh lịch", "attractive and graceful in style", "She looked elegant in a simple dress."),
        w("stylish", "/ˈstaɪlɪʃ/", "adj", "sành điệu", "fashionable and attractive", "He has a very stylish coat."),
        w("bold", "/bəʊld/", "adj", "táo bạo", "strong and easy to notice", "She chose a bold red jacket."),
        w("plain", "/pleɪn/", "adj", "trơn, không hoa văn", "simple, without decoration", "I prefer plain T-shirts."),
        w("patterned", "/ˈpætənd/", "adj", "có hoa văn", "decorated with a repeated design", "He wore a patterned shirt."),
        w("striped", "/straɪpt/", "adj", "có sọc", "having lines of different colours", "The team wears striped shirts."),
        w("floral", "/ˈflɔːrəl/", "adj", "có họa tiết hoa", "decorated with flowers", "She bought a floral summer dress."),
        w("trendsetter", "/ˈtrendsetə(r)/", "n", "người dẫn đầu xu hướng", "a person who starts new fashions", "The singer is a real trendsetter."),
        w("thrift shop", "/ˈθrɪft ʃɒp/", "n", "cửa hàng đồ cũ", "a shop selling used clothes cheaply", "I found this jacket in a thrift shop."),
        w("timeless", "/ˈtaɪmləs/", "adj", "vượt thời gian", "always fashionable, never out of date", "A white shirt is timeless."),
        w("designer label", "/dɪˈzaɪnə leɪbl/", "n", "nhãn hàng thiết kế", "a well-known expensive fashion brand", "He only wears designer labels."),
        w("attire", "/əˈtaɪə(r)/", "n", "trang phục (trang trọng)", "clothes, especially formal ones", "The invitation says smart attire."),
      ],
    },
  ],
};
