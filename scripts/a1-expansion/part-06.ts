import { lesson, w, type A1TopicExpansion } from "./helpers";

export const PART_06: Record<string, A1TopicExpansion> = {
  "so-dem-so-luong": {
    extraWord: w("zero", "/ˈzɪərəʊ/", "n", "số không", "the number 0", "The temperature is zero degrees today."),
    lessons: [
      lesson(
        "Số thứ tự",
        "15 từ chỉ thứ tự, vị trí và thứ hạng trong một dãy.",
        "Nói thứ tự của sự vật",
        `- **first**: thứ nhất
- **last**: cuối cùng
- **next**: tiếp theo
- **position**: vị trí
- **twelfth**: thứ mười hai

My birthday is on the **third** of May. She is the **first** student in line, and he is the **last** one.`,
        "first = thứ nhất; last = cuối cùng; next = tiếp theo; position = vị trí.",
        [
          w("first", "/fɜːst/", "adj", "thứ nhất", "coming before all others", "She is the first person in the queue."),
          w("third", "/θɜːd/", "adj", "thứ ba", "coming after the second", "My birthday is on the third of May."),
          w("fourth", "/fɔːθ/", "adj", "thứ tư", "coming after the third", "He lives on the fourth floor."),
          w("fifth", "/fɪfθ/", "adj", "thứ năm", "coming after the fourth", "This is my fifth English lesson."),
          w("sixth", "/sɪksθ/", "adj", "thứ sáu", "coming after the fifth", "June is the sixth month of the year."),
          w("seventh", "/ˈsevnθ/", "adj", "thứ bảy", "coming after the sixth", "She sits in the seventh row."),
          w("eighth", "/eɪtθ/", "adj", "thứ tám", "coming after the seventh", "Our team finished in eighth place."),
          w("ninth", "/naɪnθ/", "adj", "thứ chín", "coming after the eighth", "He is the ninth student on the list."),
          w("tenth", "/tenθ/", "adj", "thứ mười", "coming after the ninth", "This is the tenth day of the course."),
          w("eleventh", "/ɪˈlevnθ/", "adj", "thứ mười một", "coming after the tenth", "Her office is on the eleventh floor."),
          w("twelfth", "/twelfθ/", "adj", "thứ mười hai", "coming after the eleventh", "December is the twelfth month."),
          w("twentieth", "/ˈtwentiəθ/", "adj", "thứ hai mươi", "coming after the nineteenth", "It is his twentieth birthday."),
          w("last", "/lɑːst/", "adj", "cuối cùng", "coming after all others", "He is the last student in line."),
          w("next", "/nekst/", "adj", "tiếp theo", "coming immediately after this one", "See you next week."),
          w("position", "/pəˈzɪʃn/", "n", "vị trí", "the place where someone or something is", "Please stand in your position."),
        ],
      ),
      lesson(
        "Số lượng & đơn vị",
        "15 từ chỉ số lượng lớn và đơn vị đếm thông dụng.",
        "Đếm số lượng và đơn vị",
        `- **thirteen**: mười ba
- **thousand**: một nghìn
- **half**: một nửa
- **pair**: một đôi
- **bottle**: chai

There are **fifteen** students in my class. I would like a **bottle** of water and a **pair** of shoes.`,
        "thousand = 1.000; million = 1.000.000; half = một nửa; pair = một đôi.",
        [
          w("thirteen", "/ˌθɜːˈtiːn/", "n", "mười ba", "the number 13", "There are thirteen books on the shelf."),
          w("fifteen", "/ˌfɪfˈtiːn/", "n", "mười lăm", "the number 15", "Fifteen students are in the classroom."),
          w("thirty", "/ˈθɜːti/", "n", "ba mươi", "the number 30", "My mother is thirty years old."),
          w("forty", "/ˈfɔːti/", "n", "bốn mươi", "the number 40", "The bus leaves in forty minutes."),
          w("fifty", "/ˈfɪfti/", "n", "năm mươi", "the number 50", "This book has fifty pages."),
          w("sixty", "/ˈsɪksti/", "n", "sáu mươi", "the number 60", "An hour has sixty minutes."),
          w("seventy", "/ˈsevnti/", "n", "bảy mươi", "the number 70", "My grandfather is seventy."),
          w("eighty", "/ˈeɪti/", "n", "tám mươi", "the number 80", "The old man is eighty years old."),
          w("ninety", "/ˈnaɪnti/", "n", "chín mươi", "the number 90", "There are ninety seats in the hall."),
          w("thousand", "/ˈθaʊznd/", "n", "một nghìn", "the number 1,000", "The town has a thousand people."),
          w("million", "/ˈmɪljən/", "n", "một triệu", "the number 1,000,000", "The city has a million people."),
          w("half", "/hɑːf/", "n", "một nửa", "one of two equal parts", "I ate half of the cake."),
          w("pair", "/peə/", "n", "một đôi", "two things that go together", "I bought a pair of shoes."),
          w("piece", "/piːs/", "n", "một miếng", "a part of something", "Would you like a piece of bread?"),
          w("bottle", "/ˈbɒtl/", "n", "chai", "a container for water or drinks", "I would like a bottle of water."),
        ],
      ),
      lesson(
        "Toán & so sánh",
        "15 từ dùng khi tính toán và so sánh số lượng.",
        "Cộng, trừ và so sánh",
        `- **add**: cộng
- **subtract**: trừ
- **equal**: bằng
- **more**: nhiều hơn
- **enough**: đủ

If you **add** two and three, you get five. Ten **minus** four is **equal** to six.`,
        "add = cộng; subtract = trừ; plus = cộng; minus = trừ; equal = bằng.",
        [
          w("add", "/æd/", "v", "cộng", "to put numbers together", "Add two and three to get five."),
          w("subtract", "/səbˈtrækt/", "v", "trừ", "to take one number away from another", "Subtract four from ten."),
          w("plus", "/plʌs/", "prep", "cộng với", "used to show addition", "Two plus three is five."),
          w("minus", "/ˈmaɪnəs/", "prep", "trừ đi", "used to show subtraction", "Ten minus four is six."),
          w("equal", "/ˈiːkwəl/", "adj", "bằng nhau", "the same in amount or size", "Five plus five is equal to ten."),
          w("total", "/ˈtəʊtl/", "n", "tổng số", "the whole amount", "The total is twenty dollars."),
          w("number", "/ˈnʌmbə/", "n", "con số", "a word or symbol for counting", "What is your phone number?"),
          w("count", "/kaʊnt/", "v", "đếm", "to say numbers in order", "The child can count to ten."),
          w("more", "/mɔː/", "adv", "nhiều hơn", "a larger amount", "I need more time."),
          w("less", "/les/", "adv", "ít hơn", "a smaller amount", "Eat less sugar."),
          w("many", "/ˈmeni/", "det", "nhiều", "used with countable nouns", "How many books do you have?"),
          w("much", "/mʌtʃ/", "det", "nhiều", "used with uncountable nouns", "How much water is there?"),
          w("few", "/fjuː/", "det", "ít, một vài", "a small number of", "Only a few people came."),
          w("little", "/ˈlɪtl/", "det", "ít, một chút", "a small amount of", "There is little milk left."),
          w("enough", "/ɪˈnʌf/", "adj", "đủ", "as much as you need", "We have enough food for everyone."),
        ],
      ),
    ],
  },
  "mau-sac-hinh-dang": {
    extraWord: w("gold", "/ɡəʊld/", "n", "màu vàng kim", "a shiny yellow colour like metal", "She has a gold ring."),
    lessons: [
      lesson(
        "Màu sắc & sắc thái",
        "15 từ chỉ màu sắc và các sắc thái màu trong đời sống.",
        "Màu sắc và sắc thái",
        `- **dark**: tối, đậm
- **light**: nhạt, sáng
- **bright**: sáng, rực rỡ
- **silver**: màu bạc
- **plain**: trơn, một màu

Her dress is **dark** blue, and mine is **light** blue. The **colourful** kite looks lovely in the **bright** sky.`,
        "dark = tối/đậm; light = nhạt/sáng; bright = rực rỡ; plain = trơn.",
        [
          w("dark", "/dɑːk/", "adj", "tối, đậm", "not light in colour", "He is wearing a dark blue coat."),
          w("light", "/laɪt/", "adj", "nhạt, sáng", "pale in colour", "She likes light colours in summer."),
          w("bright", "/braɪt/", "adj", "sáng, rực rỡ", "strong and easy to see", "The flowers are bright red."),
          w("silver", "/ˈsɪlvə/", "adj", "màu bạc", "shiny grey like metal", "She wore a silver necklace."),
          w("beige", "/beɪʒ/", "adj", "màu be", "a light brown colour", "The walls are beige."),
          w("violet", "/ˈvaɪələt/", "adj", "màu tím", "a colour between blue and purple", "She painted the sky violet."),
          w("navy", "/ˈneɪvi/", "adj", "màu xanh navy", "a dark blue colour", "He wears a navy suit to work."),
          w("turquoise", "/ˈtɜːkwɔɪz/", "adj", "màu xanh ngọc", "a bright blue-green colour", "The sea is turquoise today."),
          w("cream", "/kriːm/", "adj", "màu kem", "a pale yellow-white colour", "She chose a cream shirt."),
          w("colourful", "/ˈkʌləfl/", "adj", "nhiều màu sắc", "having many bright colours", "The market is very colourful."),
          w("plain", "/pleɪn/", "adj", "trơn, một màu", "simple, without a pattern", "He likes plain white T-shirts."),
          w("favourite colour", "/ˈfeɪvərɪt ˈkʌlə/", "phrase", "màu yêu thích", "the colour you like best", "Blue is my favourite colour."),
          w("golden", "/ˈɡəʊldən/", "adj", "màu vàng óng", "bright yellow like gold", "The leaves turn golden in autumn."),
          w("maroon", "/məˈruːn/", "adj", "màu đỏ đô", "a dark red colour", "The team wears maroon shirts."),
          w("lilac", "/ˈlaɪlək/", "adj", "màu tím hoa cà", "a pale purple colour", "She painted her room lilac."),
        ],
      ),
      lesson(
        "Hình dạng",
        "15 từ chỉ hình dạng, đường nét và hoa văn.",
        "Mô tả hình dạng",
        `- **triangle**: hình tam giác
- **rectangle**: hình chữ nhật
- **oval**: hình bầu dục
- **star**: hình ngôi sao
- **pattern**: hoa văn

The table is a **rectangle**, and the mirror is **oval**. The child drew a **star** and a **triangle** on the paper.`,
        "triangle = tam giác; rectangle = chữ nhật; oval = bầu dục; cube = khối lập phương.",
        [
          w("triangle", "/ˈtraɪæŋɡl/", "n", "hình tam giác", "a shape with three sides", "The roof looks like a triangle."),
          w("rectangle", "/ˈrektæŋɡl/", "n", "hình chữ nhật", "a shape with four straight sides", "The table is a rectangle."),
          w("oval", "/ˈəʊvl/", "n", "hình bầu dục", "a shape like an egg", "The mirror is oval."),
          w("star", "/stɑː/", "n", "hình ngôi sao", "a shape with five or more points", "She drew a star on the card."),
          w("diamond", "/ˈdaɪəmənd/", "n", "hình thoi", "a shape with four equal sides at an angle", "The kite is shaped like a diamond."),
          w("line", "/laɪn/", "n", "đường thẳng", "a long thin mark", "Draw a line under the word."),
          w("side", "/saɪd/", "n", "cạnh", "one of the lines of a shape", "A square has four sides."),
          w("round", "/raʊnd/", "adj", "tròn", "shaped like a circle", "The ball is round."),
          w("shape", "/ʃeɪp/", "n", "hình dạng", "the outer form of something", "What shape is the box?"),
          w("pattern", "/ˈpætn/", "n", "hoa văn", "a repeated design", "Her dress has a flower pattern."),
          w("curve", "/kɜːv/", "n", "đường cong", "a smooth curved line", "The road has a sharp curve."),
          w("arrow", "/ˈærəʊ/", "n", "mũi tên", "a sign that points the way", "Follow the arrow to the exit."),
          w("cross", "/krɒs/", "n", "dấu cộng, hình chữ thập", "a shape made of two crossing lines", "Put a cross next to the answer."),
          w("stripe", "/straɪp/", "n", "sọc", "a long narrow line of colour", "His shirt has blue stripes."),
          w("cube", "/kjuːb/", "n", "khối lập phương", "a solid shape with six square sides", "The child plays with a cube."),
        ],
      ),
      lesson(
        "Kích thước & mô tả",
        "15 từ mô tả kích thước, độ dài và độ lớn của đồ vật.",
        "Mô tả kích thước",
        `- **big**: to, lớn
- **small**: nhỏ
- **long**: dài
- **wide**: rộng
- **narrow**: hẹp

The room is **big**, but the window is **small**. The river is **wide** and **deep** here.`,
        "big/large = to; small/tiny = nhỏ; wide = rộng; narrow = hẹp; deep = sâu.",
        [
          w("big", "/bɪɡ/", "adj", "to, lớn", "large in size", "They live in a big house."),
          w("small", "/smɔːl/", "adj", "nhỏ", "not large in size", "She has a small bag."),
          w("long", "/lɒŋ/", "adj", "dài", "measuring a lot from end to end", "The river is very long."),
          w("wide", "/waɪd/", "adj", "rộng", "large from side to side", "The road is wide."),
          w("narrow", "/ˈnærəʊ/", "adj", "hẹp", "not wide", "The street is narrow."),
          w("thick", "/θɪk/", "adj", "dày", "not thin", "This book is very thick."),
          w("large", "/lɑːdʒ/", "adj", "lớn", "big in size or amount", "We ordered a large pizza."),
          w("tiny", "/ˈtaɪni/", "adj", "rất nhỏ", "extremely small", "A tiny bird sat on the branch."),
          w("huge", "/hjuːdʒ/", "adj", "khổng lồ", "extremely large", "They have a huge garden."),
          w("width", "/wɪdθ/", "n", "chiều rộng", "the distance from side to side", "Measure the width of the door."),
          w("height", "/haɪt/", "n", "chiều cao", "the distance from bottom to top", "What is your height?"),
          w("measure", "/ˈmeʒə/", "v", "đo", "to find the size of something", "Use a ruler to measure the line."),
          w("deep", "/diːp/", "adj", "sâu", "going far down", "The lake is very deep."),
          w("shallow", "/ˈʃæləʊ/", "adj", "nông", "not deep", "Children swim in the shallow water."),
          w("length", "/leŋθ/", "n", "chiều dài", "the distance from end to end", "The length of the room is five metres."),
        ],
      ),
    ],
  },
  "dong-vat-thien-nhien": {
    extraWord: w("wild", "/waɪld/", "adj", "hoang dã", "living in nature, not with people", "Wild animals live in the forest."),
    lessons: [
      lesson(
        "Động vật nuôi & hoang dã",
        "15 con vật quen thuộc trong trang trại và trong tự nhiên.",
        "Động vật quanh ta",
        `- **pig**: con lợn
- **sheep**: con cừu
- **duck**: con vịt
- **tiger**: con hổ
- **elephant**: con voi

The **pig** and the **duck** live on the farm. A **tiger** is a big wild cat, and an **elephant** has a long nose.`,
        "sheep = con cừu (số nhiều vẫn là sheep); mouse = con chuột; wolf = con sói.",
        [
          w("pig", "/pɪɡ/", "n", "con lợn", "a farm animal with a fat body", "The pig is in the mud."),
          w("sheep", "/ʃiːp/", "n", "con cừu", "a farm animal with thick wool", "The farmer keeps ten sheep."),
          w("goat", "/ɡəʊt/", "n", "con dê", "a farm animal with horns", "The goat eats grass."),
          w("duck", "/dʌk/", "n", "con vịt", "a bird that swims in water", "The duck swims in the lake."),
          w("rabbit", "/ˈræbɪt/", "n", "con thỏ", "a small animal with long ears", "The rabbit has long ears."),
          w("mouse", "/maʊs/", "n", "con chuột", "a small animal with a long tail", "A mouse ran under the bed."),
          w("tiger", "/ˈtaɪɡə/", "n", "con hổ", "a large wild cat with orange fur", "The tiger lives in the jungle."),
          w("lion", "/ˈlaɪən/", "n", "con sư tử", "a large wild cat with a big head", "The lion is the king of animals."),
          w("monkey", "/ˈmʌŋki/", "n", "con khỉ", "an animal that climbs trees", "The monkey is eating a banana."),
          w("elephant", "/ˈelɪfənt/", "n", "con voi", "a very large grey animal", "An elephant has a long nose."),
          w("snake", "/sneɪk/", "n", "con rắn", "a long animal with no legs", "The snake moves through the grass."),
          w("frog", "/frɒɡ/", "n", "con ếch", "a small green animal that jumps", "The frog jumps into the water."),
          w("wolf", "/wʊlf/", "n", "con sói", "a wild animal like a large dog", "The wolf lives in the forest."),
          w("fox", "/fɒks/", "n", "con cáo", "a wild animal with red fur", "A fox ran across the field."),
          w("bear", "/beə/", "n", "con gấu", "a large strong wild animal", "The bear sleeps in winter."),
        ],
      ),
      lesson(
        "Cây cối & hoa",
        "15 từ về cây, hoa và các bộ phận của thực vật.",
        "Cây cối và hoa",
        `- **leaf**: chiếc lá
- **branch**: cành cây
- **root**: rễ cây
- **seed**: hạt giống
- **forest**: khu rừng

A **seed** grows into a plant. The **leaf** falls from the **branch**, and the **root** stays under the ground.`,
        "leaf = lá (số nhiều: leaves); branch = cành; root = rễ; seed = hạt; petal = cánh hoa.",
        [
          w("leaf", "/liːf/", "n", "chiếc lá", "a flat green part of a plant", "A leaf fell from the tree."),
          w("branch", "/brɑːntʃ/", "n", "cành cây", "a part of a tree that grows out", "The bird sat on a branch."),
          w("root", "/ruːt/", "n", "rễ cây", "the part of a plant under the ground", "The roots take water from the soil."),
          w("seed", "/siːd/", "n", "hạt giống", "a small part of a plant that grows", "Plant the seed in the soil."),
          w("rose", "/rəʊz/", "n", "hoa hồng", "a flower with a sweet smell", "He gave her a red rose."),
          w("lotus", "/ˈləʊtəs/", "n", "hoa sen", "a water flower with large pink petals", "The lotus grows in the pond."),
          w("bamboo", "/ˌbæmˈbuː/", "n", "cây tre", "a tall plant with hard stems", "The village is full of bamboo."),
          w("palm", "/pɑːm/", "n", "cây cọ", "a tree with large leaves at the top", "A palm grows near the beach."),
          w("pine", "/paɪn/", "n", "cây thông", "an evergreen tree with needles", "The pine stays green in winter."),
          w("bush", "/bʊʃ/", "n", "bụi cây", "a small low plant with many branches", "The cat is hiding in the bush."),
          w("forest", "/ˈfɒrɪst/", "n", "khu rừng", "a large area with many trees", "We walked through the forest."),
          w("wood", "/wʊd/", "n", "gỗ", "the hard material from trees", "The table is made of wood."),
          w("fern", "/fɜːn/", "n", "cây dương xỉ", "a green plant with many small leaves", "A fern grows in the shade."),
          w("grow", "/ɡrəʊ/", "v", "mọc, trồng", "to become bigger over time", "These flowers grow in spring."),
          w("petal", "/ˈpetl/", "n", "cánh hoa", "one of the coloured parts of a flower", "Each petal is soft and pink."),
        ],
      ),
      lesson(
        "Thiên nhiên & môi trường",
        "15 từ chỉ cảnh quan thiên nhiên và các vật thể trên bầu trời.",
        "Cảnh quan và bầu trời",
        `- **lake**: hồ
- **hill**: ngọn đồi
- **valley**: thung lũng
- **waterfall**: thác nước
- **planet**: hành tinh

We swam in the **lake** and climbed the **hill**. At night, the **moon** and the **stars** shine above the **valley**.`,
        "lake = hồ; hill = đồi; valley = thung lũng; waterfall = thác; shore/coast = bờ biển.",
        [
          w("lake", "/leɪk/", "n", "hồ", "a large area of water with land around it", "We swim in the lake in summer."),
          w("shore", "/ʃɔː/", "n", "bờ biển, bờ hồ", "the land at the edge of water", "They walked along the shore."),
          w("coast", "/kəʊst/", "n", "bờ biển", "the land next to the sea", "The town is on the coast."),
          w("hill", "/hɪl/", "n", "ngọn đồi", "a small mountain", "There is a house on the hill."),
          w("field", "/fiːld/", "n", "cánh đồng", "an area of land for plants or animals", "Cows are eating grass in the field."),
          w("valley", "/ˈvæli/", "n", "thung lũng", "low land between hills", "A river runs through the valley."),
          w("cave", "/keɪv/", "n", "hang động", "a large hole in a hill or rock", "The cave is dark and cool."),
          w("waterfall", "/ˈwɔːtəfɔːl/", "n", "thác nước", "water falling from a high place", "The waterfall is beautiful."),
          w("rock", "/rɒk/", "n", "tảng đá", "a large stone", "We sat on a rock by the sea."),
          w("sand", "/sænd/", "n", "cát", "yellow grains on a beach", "The children play in the sand."),
          w("cloud", "/klaʊd/", "n", "đám mây", "a white or grey shape in the sky", "A white cloud is in the sky."),
          w("sun", "/sʌn/", "n", "mặt trời", "the star that gives us light", "The sun is hot today."),
          w("moon", "/muːn/", "n", "mặt trăng", "the object that shines at night", "The moon is bright tonight."),
          w("planet", "/ˈplænɪt/", "n", "hành tinh", "a large round object in space", "Earth is our planet."),
          w("earth", "/ɜːθ/", "n", "trái đất", "the planet we live on", "We must look after the earth."),
        ],
      ),
    ],
  },
};
