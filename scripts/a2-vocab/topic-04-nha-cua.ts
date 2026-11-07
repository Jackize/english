import { w } from "./helpers";
import type { SeedVocabTopic } from "../curriculum-data";

/** Chủ đề 04: Nhà cửa & nơi ở. */
export const TOPIC_04: SeedVocabTopic = {
  name: "Nhà cửa & nơi ở",
  slug: "nha-cua-noi-o",
  icon: "home",
  description:
    "Từ vựng về loại nhà, đồ đạc, thuê nhà, chuyển nhà và những sự cố thường gặp trong nhà.",
  lessons: [
    {
      title: "Loại nhà & khu vực sống",
      summary:
        "20 từ/cụm từ về căn hộ, nhà phố, biệt thự, tòa nhà và các tầng trong một ngôi nhà.",
      sections: [
        {
          title: "Các loại nhà",
          body: `- **apartment / flat**: căn hộ
- **bungalow**: nhà một tầng
- **cottage**: nhà nhỏ ở nông thôn
- **villa**: biệt thự
- **mansion**: dinh thự lớn
- **studio flat**: căn hộ một phòng

Mẫu câu:
- They live in a small **cottage** by the sea.
- We rented a **studio flat** in the city centre.`,
          remember: "flat là Anh-Anh, apartment là Anh-Mỹ; nghĩa giống nhau.",
        },
        {
          title: "Tầng và không gian ngoài",
          body: `- **ground floor**: tầng trệt
- **first floor**: tầng một (theo cách Anh)
- **basement**: tầng hầm
- **attic**: gác mái
- **balcony**: ban công
- **terrace**: sân thượng, hiên
- **garage**: ga-ra
- **yard / garden**: sân, vườn

Mẫu câu:
- The kitchen is on the **ground floor**.
- We keep our bikes in the **garage**.`,
          remember: "Ở Anh, ground floor là tầng trệt; first floor là tầng phía trên.",
        },
      ],
      words: [
        w("accommodation", "/əˌkɒməˈdeɪʃn/", "n", "chỗ ở", "a place to live or stay", "The price includes accommodation."),
        w("apartment", "/əˈpɑːtmənt/", "n", "căn hộ", "a set of rooms in a larger building", "They bought a two-bedroom apartment."),
        w("bungalow", "/ˈbʌŋɡələʊ/", "n", "nhà một tầng", "a house with only one floor", "My grandparents live in a bungalow."),
        w("cottage", "/ˈkɒtɪdʒ/", "n", "nhà nhỏ ở nông thôn", "a small house in the countryside", "We stayed in a charming cottage."),
        w("villa", "/ˈvɪlə/", "n", "biệt thự", "a large comfortable house, often with a garden", "The villa has a swimming pool."),
        w("mansion", "/ˈmænʃn/", "n", "dinh thự lớn", "a very large impressive house", "The film star lives in a huge mansion."),
        w("studio flat", "/ˈstjuːdiəʊ flæt/", "n", "căn hộ một phòng", "a small flat with one main room", "A studio flat is perfect for one person."),
        w("dormitory", "/ˈdɔːmətri/", "n", "ký túc xá", "a building where students sleep", "She lives in a university dormitory."),
        w("hostel", "/ˈhɒstl/", "n", "nhà nghỉ tập thể", "a cheap place to stay with shared rooms", "We booked a hostel near the beach."),
        w("skyscraper", "/ˈskaɪskreɪpə(r)/", "n", "tòa nhà chọc trời", "a very tall building", "The city is full of skyscrapers."),
        w("building", "/ˈbɪldɪŋ/", "n", "tòa nhà", "a structure with a roof and walls", "Our office is in that building."),
        w("block of flats", "/ˌblɒk əv ˈflæts/", "n", "khu chung cư", "a building divided into several flats", "They live on the fifth floor of a block of flats."),
        w("ground floor", "/ˌɡraʊnd ˈflɔː(r)/", "n", "tầng trệt", "the floor at street level", "The shop is on the ground floor."),
        w("basement", "/ˈbeɪsmənt/", "n", "tầng hầm", "a room below ground level", "We store old furniture in the basement."),
        w("attic", "/ˈætɪk/", "n", "gác mái", "a room under the roof of a house", "The children sleep in the attic."),
        w("balcony", "/ˈbælkəni/", "n", "ban công", "a platform outside an upper window", "We have breakfast on the balcony."),
        w("terrace", "/ˈterəs/", "n", "sân thượng, hiên", "an outdoor area next to a building", "The flat has a small roof terrace."),
        w("garage", "/ˈɡærɑːʒ/", "n", "ga-ra", "a building for a car", "The garage is next to the kitchen."),
        w("garden", "/ˈɡɑːdn/", "n", "khu vườn", "an area with grass and plants outside a house", "There is a large garden behind the house."),
        w("yard", "/jɑːd/", "n", "sân", "an enclosed area outside a building", "The children play in the yard."),
      ],
    },
    {
      title: "Đồ đạc trong nhà",
      summary:
        "20 từ/cụm từ về nội thất, đồ dùng phòng ngủ, phòng khách và thiết bị trong nhà.",
      sections: [
        {
          title: "Nội thất cơ bản",
          body: `- **furniture**: đồ nội thất (không đếm được)
- **cupboard**: tủ đựng đồ
- **wardrobe**: tủ quần áo
- **drawer**: ngăn kéo
- **shelf**: kệ
- **bookcase**: giá sách

Mẫu câu:
- We need some new **furniture** for the living room.
- Put the plates in the **cupboard**.`,
          remember: "furniture không có số nhiều; dùng a piece of furniture.",
        },
        {
          title: "Phòng ngủ và phòng khách",
          body: `- **carpet / rug**: thảm trải sàn / thảm nhỏ
- **curtain**: rèm cửa
- **blanket**: chăn
- **pillow**: gối
- **mattress**: đệm
- **armchair**: ghế bành
- **coffee table**: bàn trà
- **lamp**: đèn

Mẫu câu:
- The **mattress** is too soft for me.
- She sat in the **armchair** by the window.`,
          remember: "pillow là gối nằm; cushion là gối tựa.",
        },
      ],
      words: [
        w("furniture", "/ˈfɜːnɪtʃə(r)/", "n", "đồ nội thất", "tables, chairs, beds and similar items", "The flat came with all the furniture."),
        w("cupboard", "/ˈkʌbəd/", "n", "tủ đựng đồ", "a piece of furniture with doors and shelves", "The cups are in the kitchen cupboard."),
        w("wardrobe", "/ˈwɔːdrəʊb/", "n", "tủ quần áo", "a large cupboard for clothes", "I hung my suit in the wardrobe."),
        w("drawer", "/drɔː(r)/", "n", "ngăn kéo", "a box-like part that slides out of furniture", "My keys are in the top drawer."),
        w("shelf", "/ʃelf/", "n", "kệ", "a flat board for putting things on", "She put the photo on the shelf."),
        w("bookcase", "/ˈbʊkkeɪs/", "n", "giá sách", "a piece of furniture with shelves for books", "The bookcase is full of old novels."),
        w("carpet", "/ˈkɑːpɪt/", "n", "thảm trải sàn", "a thick cover for a floor", "The carpet in the bedroom is grey."),
        w("rug", "/rʌɡ/", "n", "thảm nhỏ", "a small carpet", "There is a rug in front of the sofa."),
        w("curtain", "/ˈkɜːtn/", "n", "rèm cửa", "a cloth that covers a window", "Please close the curtains."),
        w("blanket", "/ˈblæŋkɪt/", "n", "chăn", "a thick cover used to keep warm", "I need an extra blanket tonight."),
        w("pillow", "/ˈpɪləʊ/", "n", "gối nằm", "a soft support for your head", "This pillow is too hard."),
        w("mattress", "/ˈmætrəs/", "n", "đệm", "the soft part of a bed", "We bought a new mattress last week."),
        w("lamp", "/læmp/", "n", "đèn", "an object that gives light", "Turn on the lamp next to the bed."),
        w("socket", "/ˈsɒkɪt/", "n", "ổ cắm điện", "a place where you plug in an electrical device", "There is a socket behind the desk."),
        w("plug", "/plʌɡ/", "n", "phích cắm", "the part that connects a device to electricity", "The plug doesn't fit this socket."),
        w("heater", "/ˈhiːtə(r)/", "n", "máy sưởi", "a device that makes a room warm", "We use the heater in winter."),
        w("air conditioner", "/ˈeə kəndɪʃənə(r)/", "n", "máy điều hòa", "a machine that cools the air", "The air conditioner is very noisy."),
        w("fan", "/fæn/", "n", "quạt", "a machine that moves air", "Could you turn on the fan?"),
        w("armchair", "/ˈɑːmtʃeə(r)/", "n", "ghế bành", "a comfortable chair with sides", "My grandfather fell asleep in the armchair."),
        w("coffee table", "/ˈkɒfi teɪbl/", "n", "bàn trà", "a low table in front of a sofa", "The magazines are on the coffee table."),
      ],
    },
    {
      title: "Thuê nhà & chuyển nhà",
      summary:
        "20 từ/cụm từ về hợp đồng thuê, tiền đặt cọc, chuyển nhà, hoá đơn và tìm nơi ở mới.",
      sections: [
        {
          title: "Thuê nhà",
          body: `- **rent**: tiền thuê; thuê
- **landlord / tenant**: chủ nhà / người thuê
- **deposit**: tiền đặt cọc
- **lease / contract**: hợp đồng thuê
- **furnished / unfurnished**: có / không có nội thất

Mẫu câu:
- We paid one month's **deposit**.
- The flat is fully **furnished**.`,
          remember: "rent something from somebody — thuê của ai.",
        },
        {
          title: "Chuyển nhà",
          body: `- **move in / move out**: dọn vào / dọn ra
- **move house**: chuyển nhà
- **pack / unpack**: đóng gói / mở đồ
- **removal van**: xe tải chuyển nhà
- **estate agent**: môi giới nhà đất
- **mortgage**: khoản vay mua nhà

Mẫu câu:
- We **moved house** last month.
- It took two days to **unpack** everything.`,
          remember: "move house không có tân ngữ chỉ vật; move to + nơi chốn.",
        },
      ],
      words: [
        w("rent", "/rent/", "n/v", "tiền thuê; thuê", "money paid to use a place; to pay for its use", "The rent is due on the first of the month."),
        w("landlord", "/ˈlændlɔːd/", "n", "chủ nhà cho thuê", "the owner of a rented property", "The landlord fixed the heating quickly."),
        w("tenant", "/ˈtenənt/", "n", "người thuê nhà", "a person who rents a place", "The tenant pays for electricity."),
        w("deposit", "/dɪˈpɒzɪt/", "n", "tiền đặt cọc", "money paid in advance as security", "You get the deposit back when you leave."),
        w("lease", "/liːs/", "n", "hợp đồng thuê", "a legal agreement to rent property", "The lease lasts for twelve months."),
        w("contract", "/ˈkɒntrækt/", "n", "hợp đồng", "a written legal agreement", "Read the contract before you sign it."),
        w("move in", "/ˌmuːv ˈɪn/", "phr v", "dọn vào ở", "to start living in a place", "We are moving in next weekend."),
        w("move out", "/ˌmuːv ˈaʊt/", "phr v", "dọn ra", "to leave a place you have been living in", "They moved out at the end of June."),
        w("move house", "/ˌmuːv ˈhaʊs/", "phrase", "chuyển nhà", "to go and live in a different house", "We are moving house in August."),
        w("pack", "/pæk/", "v", "đóng gói, xếp đồ", "to put things into boxes or bags", "I need to pack all my books."),
        w("unpack", "/ˌʌnˈpæk/", "v", "mở đồ, dỡ hành lý", "to take things out of boxes or bags", "She unpacked her suitcase after the trip."),
        w("removal van", "/rɪˈmuːvl væn/", "n", "xe tải chuyển nhà", "a large vehicle used for moving furniture", "The removal van arrived at eight."),
        w("estate agent", "/ɪˈsteɪt eɪdʒənt/", "n", "môi giới nhà đất", "a person who helps people buy or rent property", "The estate agent showed us three flats."),
        w("mortgage", "/ˈmɔːɡɪdʒ/", "n", "khoản vay mua nhà", "a long-term loan used to buy property", "They took out a mortgage to buy the house."),
        w("utility bill", "/juːˈtɪləti bɪl/", "n", "hoá đơn điện nước", "a bill for electricity, gas or water", "The rent does not include utility bills."),
        w("electricity", "/ɪˌlekˈtrɪsəti/", "n", "điện", "a form of energy used for lighting and machines", "Our electricity bill was very high this month."),
        w("suburb", "/ˈsʌbɜːb/", "n", "vùng ngoại ô", "an area outside the centre of a city", "They live in a quiet suburb."),
        w("location", "/ləʊˈkeɪʃn/", "n", "vị trí", "the place where something is", "The flat is in a great location."),
        w("furnished", "/ˈfɜːnɪʃt/", "adj", "có đầy đủ nội thất", "supplied with furniture", "The apartment is fully furnished."),
        w("unfurnished", "/ˌʌnˈfɜːnɪʃt/", "adj", "không có nội thất", "without furniture", "We rented an unfurnished house and bought our own furniture."),
      ],
    },
    {
      title: "Sự cố & hàng xóm",
      summary:
        "20 từ/cụm từ về rò rỉ, ẩm mốc, sửa chữa, an ninh và cách ứng xử với hàng xóm.",
      sections: [
        {
          title: "Sự cố trong nhà",
          body: `- **leak**: rò rỉ
- **flood**: ngập lụt; làm ngập
- **damp / mould**: ẩm / mốc
- **crack**: vết nứt
- **power cut**: mất điện
- **maintenance**: việc bảo trì

Mẫu câu:
- There is a **leak** under the sink.
- We had a **power cut** last night.`,
          remember: "damp là tính từ/danh từ; mould là nấm mốc.",
        },
        {
          title: "An ninh và hàng xóm",
          body: `- **lock / key**: ổ khoá / chìa khoá
- **burglar / burglary**: kẻ trộm / vụ trộm
- **alarm system**: hệ thống báo động
- **noisy / noise**: ồn / tiếng ồn
- **complain / complaint**: phàn nàn / lời phàn nàn
- **privacy**: sự riêng tư

Mẫu câu:
- Our neighbours are very **noisy** at night.
- I made a **complaint** to the landlord.`,
          remember: "complain about something to somebody.",
        },
      ],
      words: [
        w("leak", "/liːk/", "n/v", "rò rỉ; chỗ rò", "a hole where liquid escapes; to escape through a hole", "There is a leak in the bathroom ceiling."),
        w("flood", "/flʌd/", "n/v", "trận lụt; làm ngập", "a large amount of water covering an area", "The heavy rain flooded the basement."),
        w("damp", "/dæmp/", "adj/n", "ẩm ướt; hơi ẩm", "slightly wet, often in an unpleasant way", "The walls feel damp in winter."),
        w("mould", "/məʊld/", "n", "nấm mốc", "a green or black growth caused by damp", "There is mould in the corner of the bathroom."),
        w("crack", "/kræk/", "n/v", "vết nứt; làm nứt", "a thin line where something is broken", "A crack appeared in the wall."),
        w("plumber", "/ˈplʌmə(r)/", "n", "thợ sửa ống nước", "a person who repairs water pipes", "We called a plumber to fix the leak."),
        w("electrician", "/ɪˌlekˈtrɪʃn/", "n", "thợ điện", "a person who repairs electrical systems", "The electrician checked the wiring."),
        w("lock", "/lɒk/", "n/v", "ổ khoá; khoá", "a device that keeps a door closed; to fasten it", "Don't forget to lock the front door."),
        w("key", "/kiː/", "n", "chìa khoá", "a small metal object used to open a lock", "I left my keys at the office."),
        w("burglar", "/ˈbɜːɡlə(r)/", "n", "kẻ trộm đột nhập", "a person who enters a building to steal", "A burglar broke in through the window."),
        w("burglary", "/ˈbɜːɡləri/", "n", "vụ trộm đột nhập", "the crime of entering a building to steal", "There was a burglary in our street."),
        w("alarm system", "/əˈlɑːm sɪstəm/", "n", "hệ thống báo động", "equipment that warns of danger or intruders", "They installed an alarm system."),
        w("noisy", "/ˈnɔɪzi/", "adj", "ồn ào", "making a lot of noise", "The neighbours are noisy at weekends."),
        w("noise", "/nɔɪz/", "n", "tiếng ồn", "a loud or unpleasant sound", "The noise from the street kept me awake."),
        w("complain", "/kəmˈpleɪn/", "v", "phàn nàn", "to say that you are unhappy about something", "We complained about the noise."),
        w("complaint", "/kəmˈpleɪnt/", "n", "lời phàn nàn", "a statement that something is wrong", "The landlord ignored my complaint."),
        w("community", "/kəˈmjuːnəti/", "n", "cộng đồng", "the people living in the same area", "Everyone in the community helped clean the park."),
        w("privacy", "/ˈprɪvəsi/", "n", "sự riêng tư", "the state of being free from public attention", "The garden gives the house more privacy."),
        w("power cut", "/ˈpaʊə kʌt/", "n", "sự mất điện", "a period when electricity is not supplied", "The storm caused a power cut."),
        w("maintenance", "/ˈmeɪntənəns/", "n", "việc bảo trì", "the work of keeping something in good condition", "The building needs regular maintenance."),
      ],
    },
  ],
};
