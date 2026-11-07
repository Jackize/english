import { w } from "./helpers";
import type { SeedVocabTopic } from "../curriculum-data";

/** Chủ đề 08: Thực phẩm & nấu ăn. */
export const TOPIC_08: SeedVocabTopic = {
  name: "Thực phẩm & nấu ăn",
  slug: "thuc-pham-nau-an",
  icon: "restaurant",
  description:
    "Từ vựng về nguyên liệu, cách nấu, khẩu vị và những tình huống khi ăn ngoài.",
  lessons: [
    {
      title: "Nguyên liệu & gia vị",
      summary:
        "20 từ/cụm từ về nguyên liệu nấu ăn, gia vị, rau củ và các loại thịt thường gặp.",
      sections: [
        {
          title: "Nguyên liệu cơ bản",
          body: `- **ingredient**: nguyên liệu
- **recipe**: công thức nấu ăn
- **flour / sugar / salt**: bột mì / đường / muối
- **oil / butter**: dầu ăn / bơ
- **sauce**: nước sốt

Mẫu câu:
- What **ingredients** do we need?
- Follow the **recipe** carefully.`,
          remember: "recipe đọc là /ˈresəpi/; không đọc như “re-sipe”.",
        },
        {
          title: "Rau củ và thịt",
          body: `- **garlic / onion**: tỏi / hành
- **tomato / potato / carrot**: cà chua / khoai tây / cà rốt
- **beef / pork / lamb**: thịt bò / thịt lợn / thịt cừu
- **seafood**: hải sản
- **spice**: gia vị cay

Mẫu câu:
- Add some **garlic** and **onion** to the pan.
- I don't eat **pork**, but I eat **seafood**.`,
          remember: "spice thường là gia vị cay; herb là rau thơm.",
        },
      ],
      words: [
        w("ingredient", "/ɪnˈɡriːdiənt/", "n", "nguyên liệu", "one of the foods used to make a dish", "The recipe uses only five ingredients."),
        w("recipe", "/ˈresəpi/", "n", "công thức nấu ăn", "instructions for preparing a dish", "My grandmother gave me her cake recipe."),
        w("flour", "/ˈflaʊə(r)/", "n", "bột mì", "powder made from grain, used in baking", "Add two cups of flour to the bowl."),
        w("sugar", "/ˈʃʊɡə(r)/", "n", "đường", "a sweet substance used in food and drinks", "Do you take sugar in your tea?"),
        w("salt", "/sɔːlt/", "n", "muối", "a white substance used to flavour food", "Add a pinch of salt."),
        w("pepper", "/ˈpepə(r)/", "n", "hạt tiêu", "a hot spice used to flavour food", "Season the soup with salt and pepper."),
        w("oil", "/ɔɪl/", "n", "dầu ăn", "a thick liquid used for cooking", "Heat some oil in the pan."),
        w("butter", "/ˈbʌtə(r)/", "n", "bơ", "a soft yellow food made from cream", "Spread some butter on the bread."),
        w("cheese", "/tʃiːz/", "n", "phô mai", "a food made from milk", "This pizza has too much cheese."),
        w("garlic", "/ˈɡɑːlɪk/", "n", "tỏi", "a strong-smelling plant used in cooking", "The sauce tastes strongly of garlic."),
        w("onion", "/ˈʌnjən/", "n", "hành", "a round vegetable with a strong taste", "Chop the onion finely."),
        w("tomato", "/təˈmɑːtəʊ/", "n", "cà chua", "a soft red fruit used in salads and sauces", "I put tomato in my sandwich."),
        w("potato", "/pəˈteɪtəʊ/", "n", "khoai tây", "a round vegetable that grows underground", "We had roast potato with dinner."),
        w("carrot", "/ˈkærət/", "n", "cà rốt", "a long orange vegetable", "Rabbits love eating carrots."),
        w("beef", "/biːf/", "n", "thịt bò", "meat from a cow", "The beef needs to cook for two hours."),
        w("pork", "/pɔːk/", "n", "thịt lợn", "meat from a pig", "She doesn't eat pork."),
        w("lamb", "/læm/", "n", "thịt cừu", "meat from a young sheep", "Lamb is popular at Easter."),
        w("seafood", "/ˈsiːfuːd/", "n", "hải sản", "fish and shellfish eaten as food", "The restaurant serves fresh seafood."),
        w("sauce", "/sɔːs/", "n", "nước sốt", "a thick liquid served with food", "Would you like some tomato sauce?"),
        w("spice", "/spaɪs/", "n", "gia vị cay", "a strong-flavoured substance used in cooking", "This curry has a lot of spice."),
      ],
    },
    {
      title: "Cách chế biến",
      summary:
        "20 động từ chỉ cách nấu, cắt, trộn, nêm nếm và trình bày món ăn.",
      sections: [
        {
          title: "Nấu bằng nhiệt",
          body: `- **boil**: luộc, đun sôi
- **fry**: chiên, rán
- **bake**: nướng (bánh, trong lò)
- **roast**: nướng (thịt, rau)
- **grill**: nướng trên vỉ
- **steam**: hấp
- **heat**: làm nóng

Mẫu câu:
- **Boil** the eggs for five minutes.
- **Bake** the cake in the oven.`,
          remember: "bake thường dùng cho bánh; roast dùng cho thịt và rau.",
        },
        {
          title: "Sơ chế và hoàn thiện",
          body: `- **chop / slice / peel**: băm / thái lát / gọt vỏ
- **mix / stir**: trộn / khuấy
- **pour**: rót
- **add**: thêm
- **taste**: nếm
- **serve**: dọn ra bàn
- **garnish**: trang trí món ăn

Mẫu câu:
- **Chop** the onions and **add** them to the pan.
- **Serve** the soup with fresh bread.`,
          remember: "chop là băm/chặt; slice là thái thành lát.",
        },
      ],
      words: [
        w("boil", "/bɔɪl/", "v", "luộc, đun sôi", "to cook in boiling water", "Boil the rice for twenty minutes."),
        w("fry", "/fraɪ/", "v", "chiên, rán", "to cook in hot oil", "Fry the onions until golden."),
        w("bake", "/beɪk/", "v", "nướng (bánh)", "to cook in an oven", "She baked a cake for his birthday."),
        w("roast", "/rəʊst/", "v", "nướng (thịt, rau)", "to cook meat or vegetables in an oven", "We roasted vegetables for dinner."),
        w("grill", "/ɡrɪl/", "v", "nướng trên vỉ", "to cook over direct heat", "Grill the fish for ten minutes."),
        w("steam", "/stiːm/", "v/n", "hấp; hơi nước", "to cook with steam; hot water vapour", "Steam the vegetables to keep them healthy."),
        w("chop", "/tʃɒp/", "v", "băm, chặt", "to cut into small pieces", "Chop the garlic finely."),
        w("slice", "/slaɪs/", "v/n", "thái lát; lát", "to cut into thin pieces; a thin piece", "Slice the bread and put it on a plate."),
        w("peel", "/piːl/", "v/n", "gọt vỏ; vỏ", "to remove the skin from fruit or vegetables", "Peel the potatoes before boiling them."),
        w("mix", "/mɪks/", "v/n", "trộn; hỗn hợp", "to combine things together", "Mix the flour and sugar in a bowl."),
        w("stir", "/stɜː(r)/", "v", "khuấy", "to move something around with a spoon", "Stir the soup slowly."),
        w("pour", "/pɔː(r)/", "v", "rót", "to make liquid flow from a container", "Pour the milk into the glass."),
        w("add", "/æd/", "v", "thêm", "to put something with something else", "Add a little salt to the sauce."),
        w("taste", "/teɪst/", "v/n", "nếm; vị", "to try food; the flavour of food", "Taste the soup before you serve it."),
        w("serve", "/sɜːv/", "v", "dọn ăn, phục vụ", "to give food to people", "Serve the dish with rice."),
        w("heat", "/hiːt/", "v/n", "làm nóng; sức nóng", "to make something warm or hot", "Heat the oil in a large pan."),
        w("melt", "/melt/", "v", "làm tan chảy", "to change from solid to liquid", "Melt the butter in a small pan."),
        w("whisk", "/wɪsk/", "v", "đánh trứng", "to beat eggs or cream quickly", "Whisk the eggs until they are light."),
        w("garnish", "/ˈɡɑːnɪʃ/", "v/n", "trang trí món ăn; đồ trang trí", "to decorate food with a small amount of something", "Garnish the soup with fresh herbs."),
        w("prepare", "/prɪˈpeə(r)/", "v", "chuẩn bị", "to make food ready", "I prepared dinner before they arrived."),
      ],
    },
    {
      title: "Khẩu vị & bữa ăn",
      summary:
        "20 từ/cụm từ về bữa ăn, khẩu phần, chế độ ăn và các vị cơ bản của món ăn.",
      sections: [
        {
          title: "Bữa ăn và khẩu phần",
          body: `- **meal**: bữa ăn
- **snack**: đồ ăn nhẹ
- **starter / main course / dessert**: món khai vị / món chính / món tráng miệng
- **side dish**: món ăn kèm
- **portion**: khẩu phần

Mẫu câu:
- I usually have a light **snack** in the afternoon.
- The **portion** was too large for me.`,
          remember: "meal là bữa ăn nói chung; dish là món ăn cụ thể.",
        },
        {
          title: "Chế độ ăn và khẩu vị",
          body: `- **diet**: chế độ ăn
- **vegetarian / vegan**: ăn chay / thuần chay
- **delicious / tasty**: ngon
- **bland**: nhạt nhẽo
- **spicy / sweet / sour / salty**: cay / ngọt / chua / mặn
- **fresh**: tươi

Mẫu câu:
- This soup is **delicious** but a little **salty**.
- She follows a **vegetarian diet**.`,
          remember: "vegetarian vẫn ăn trứng và sữa; vegan không dùng sản phẩm động vật.",
        },
      ],
      words: [
        w("meal", "/miːl/", "n", "bữa ăn", "an occasion when you eat food", "We had a lovely meal together."),
        w("snack", "/snæk/", "n", "đồ ăn nhẹ", "a small amount of food between meals", "I had a snack before the meeting."),
        w("dessert", "/dɪˈzɜːt/", "n", "món tráng miệng", "sweet food eaten after a meal", "What would you like for dessert?"),
        w("starter", "/ˈstɑːtə(r)/", "n", "món khai vị", "a small dish before the main course", "We shared a starter."),
        w("main course", "/ˌmeɪn ˈkɔːs/", "n", "món chính", "the largest part of a meal", "The main course was fish with rice."),
        w("side dish", "/ˈsaɪd dɪʃ/", "n", "món ăn kèm", "a small dish served with the main meal", "We ordered a side dish of vegetables."),
        w("portion", "/ˈpɔːʃn/", "n", "khẩu phần", "the amount of food for one person", "The portions here are very generous."),
        w("diet", "/ˈdaɪət/", "n", "chế độ ăn", "the food you usually eat", "A balanced diet is important for health."),
        w("vegetarian", "/ˌvedʒəˈteəriən/", "n/adj", "người ăn chay; ăn chay", "a person who does not eat meat", "The restaurant has many vegetarian dishes."),
        w("vegan", "/ˈviːɡən/", "n/adj", "người ăn thuần chay; thuần chay", "a person who eats no animal products", "She became vegan two years ago."),
        w("hungry", "/ˈhʌŋɡri/", "adj", "đói", "wanting to eat", "I was so hungry after the long walk."),
        w("thirsty", "/ˈθɜːsti/", "adj", "khát", "wanting to drink", "We were thirsty after the game."),
        w("delicious", "/dɪˈlɪʃəs/", "adj", "ngon", "tasting very good", "That cake was delicious."),
        w("tasty", "/ˈteɪsti/", "adj", "ngon, đậm vị", "having a strong pleasant flavour", "This is a simple but tasty dish."),
        w("bland", "/blænd/", "adj", "nhạt nhẽo", "having little flavour", "The soup tasted a bit bland."),
        w("spicy", "/ˈspaɪsi/", "adj", "cay", "having a strong hot flavour", "I love spicy food."),
        w("sweet", "/swiːt/", "adj", "ngọt", "tasting like sugar", "This tea is too sweet for me."),
        w("sour", "/ˈsaʊə(r)/", "adj", "chua", "having a sharp taste like lemon", "The milk has gone sour."),
        w("salty", "/ˈsɔːlti/", "adj", "mặn", "containing too much salt", "The chips were very salty."),
        w("fresh", "/freʃ/", "adj", "tươi", "recently made, picked or caught", "We bought fresh fish at the harbour."),
      ],
    },
    {
      title: "Ăn ngoài & an toàn thực phẩm",
      summary:
        "20 từ/cụm từ về đặt bàn, gọi món, hoá đơn, bảo quản thức ăn và dị ứng thực phẩm.",
      sections: [
        {
          title: "Ở nhà hàng",
          body: `- **menu**: thực đơn
- **reservation**: sự đặt bàn
- **book a table**: đặt bàn
- **special**: món đặc biệt trong ngày
- **bill**: hoá đơn
- **service charge**: phí phục vụ

Mẫu câu:
- I'd like to **book a table** for two.
- Could we have the **bill**, please?`,
          remember: "book a table = reserve a table; bill là hoá đơn ở nhà hàng.",
        },
        {
          title: "An toàn và bảo quản",
          body: `- **leftovers**: thức ăn thừa
- **expire / expiry date**: hết hạn / hạn sử dụng
- **raw / undercooked**: sống / chưa chín kỹ
- **contaminated**: bị nhiễm khuẩn
- **food poisoning**: ngộ độc thực phẩm
- **hygiene**: vệ sinh
- **allergy / allergic**: dị ứng / bị dị ứng
- **takeaway**: đồ ăn mang đi

Mẫu câu:
- Check the **expiry date** before you eat it.
- He is **allergic** to nuts.`,
          remember: "be allergic to something — dị ứng với thứ gì.",
        },
      ],
      words: [
        w("menu", "/ˈmenjuː/", "n", "thực đơn", "a list of food available in a restaurant", "The menu changes every season."),
        w("reservation", "/ˌrezəˈveɪʃn/", "n", "sự đặt bàn", "an arrangement to keep a table for you", "I made a reservation for seven o'clock."),
        w("book a table", "/ˌbʊk ə ˈteɪbl/", "phrase", "đặt bàn", "to reserve a table at a restaurant", "We booked a table for four."),
        w("bill", "/bɪl/", "n", "hoá đơn", "a paper showing how much you must pay", "The bill came to forty pounds."),
        w("special", "/ˈspeʃl/", "n/adj", "món đặc biệt; đặc biệt", "a dish available only that day", "Today's special is seafood pasta."),
        w("leftovers", "/ˈleftəʊvəz/", "n", "thức ăn thừa", "food left after a meal", "We had leftovers for lunch."),
        w("expire", "/ɪkˈspaɪə(r)/", "v", "hết hạn", "to reach the end of a valid period", "The milk expires tomorrow."),
        w("expiry date", "/ɪkˈspaɪəri deɪt/", "n", "hạn sử dụng", "the date after which food should not be eaten", "Always check the expiry date."),
        w("food poisoning", "/ˈfuːd pɔɪzənɪŋ/", "n", "ngộ độc thực phẩm", "illness caused by contaminated food", "He got food poisoning from the seafood."),
        w("hygiene", "/ˈhaɪdʒiːn/", "n", "vệ sinh", "the practice of keeping things clean", "Food hygiene is closely checked."),
        w("raw", "/rɔː/", "adj", "sống, chưa nấu chín", "not cooked", "Do not eat raw chicken."),
        w("undercooked", "/ˌʌndəˈkʊkt/", "adj", "chưa chín kỹ", "not cooked enough", "The rice was slightly undercooked."),
        w("contaminated", "/kənˈtæmɪneɪtɪd/", "adj", "bị nhiễm khuẩn", "made dirty or unsafe by bacteria", "The water was contaminated."),
        w("allergy", "/ˈælədʒi/", "n", "dị ứng", "a medical reaction to a substance", "She has a serious nut allergy."),
        w("allergic", "/əˈlɜːdʒɪk/", "adj", "bị dị ứng", "having an allergy", "I am allergic to seafood."),
        w("takeaway", "/ˈteɪkəweɪ/", "n", "đồ ăn mang đi", "food bought to eat somewhere else", "We ordered a takeaway on Friday."),
        w("service charge", "/ˈsɜːvɪs tʃɑːdʒ/", "n", "phí phục vụ", "an extra charge added to a restaurant bill", "A service charge is included in the bill."),
        w("cutlery", "/ˈkʌtləri/", "n", "dao thìa dĩa", "knives, forks and spoons", "Could I have some clean cutlery?"),
        w("napkin", "/ˈnæpkɪn/", "n", "khăn ăn", "a piece of cloth or paper for wiping your mouth", "She put a napkin on her lap."),
        w("buffet", "/ˈbʊfeɪ/", "n", "tiệc tự chọn", "a meal where people serve themselves", "The hotel offers a breakfast buffet."),
      ],
    },
  ],
};
