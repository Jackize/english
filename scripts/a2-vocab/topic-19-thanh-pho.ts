import { w } from "./helpers";
import type { SeedVocabTopic } from "../curriculum-data";

/** Chủ đề 19: Thành phố & nông thôn. */
export const TOPIC_19: SeedVocabTopic = {
  name: "Thành phố & nông thôn",
  slug: "thanh-pho-nong-thon",
  icon: "location_city",
  description:
    "Từ vựng về đô thị, làng quê, tiện ích, so sánh hai nơi và quá trình đô thị hóa.",
  lessons: [
    {
      title: "Thành phố & tiện ích",
      summary:
        "20 từ/cụm từ về khu vực đô thị, chính quyền thành phố, dân cư và tiện ích công cộng.",
      sections: [
        {
          title: "Khu vực đô thị",
          body: `- **urban**: thuộc đô thị
- **downtown / city centre**: trung tâm thành phố
- **district / borough**: quận / khu hành chính
- **council / mayor**: hội đồng thành phố / thị trưởng
- **resident / citizen**: cư dân / công dân

Mẫu câu:
- Most **urban** areas have good public transport.
- The **mayor** opened the new library.`,
          remember: "urban là thuộc thành phố; rural là thuộc nông thôn.",
        },
        {
          title: "Dân số và tiện ích",
          body: `- **population / crowded**: dân số / đông đúc
- **lively / cosmopolitan**: sôi động / đa văn hóa
- **infrastructure**: cơ sở hạ tầng
- **facility / amenity**: tiện ích / tiện nghi
- **cycle lane / plaza / fountain / skyline**: làn xe đạp / quảng trường / đài phun nước / đường chân trời

Mẫu câu:
- The city has a **population** of two million.
- There is a new **cycle lane** along the river.`,
          remember: "infrastructure thường dùng ở số ít khi nói chung.",
        },
      ],
      words: [
        w("urban", "/ˈɜːbən/", "adj", "thuộc đô thị", "relating to a town or city", "Urban life can be exciting but noisy."),
        w("downtown", "/ˌdaʊnˈtaʊn/", "n/adv", "trung tâm thành phố", "the main business area of a city", "We spent the afternoon downtown."),
        w("city centre", "/ˌsɪti ˈsentə(r)/", "n", "trung tâm thành phố", "the central part of a city", "The museum is in the city centre."),
        w("district", "/ˈdɪstrɪkt/", "n", "quận, khu vực", "an area of a town or city", "They live in a quiet residential district."),
        w("borough", "/ˈbʌrə/", "n", "khu hành chính", "a town or part of a city with its own council", "The borough has its own library service."),
        w("council", "/ˈkaʊnsl/", "n", "hội đồng thành phố", "the local government of a town", "The council is repairing the roads."),
        w("mayor", "/meə(r)/", "n", "thị trưởng", "the elected head of a city", "The mayor gave a speech at the opening."),
        w("resident", "/ˈrezɪdənt/", "n", "cư dân", "a person who lives in a place", "Local residents complained about the noise."),
        w("citizen", "/ˈsɪtɪzn/", "n", "công dân", "a person who legally belongs to a country or city", "Every citizen has the right to vote."),
        w("population", "/ˌpɒpjuˈleɪʃn/", "n", "dân số", "the number of people living in a place", "The population has grown quickly."),
        w("crowded", "/ˈkraʊdɪd/", "adj", "đông đúc", "full of people", "The market is crowded on Saturdays."),
        w("lively", "/ˈlaɪvli/", "adj", "sôi động", "full of energy and activity", "The old quarter is lively at night."),
        w("cosmopolitan", "/ˌkɒzməˈpɒlɪtən/", "adj", "đa văn hóa", "full of people from many countries", "London is a cosmopolitan city."),
        w("infrastructure", "/ˈɪnfrəstrʌktʃə(r)/", "n", "cơ sở hạ tầng", "the basic roads, services and systems of a place", "The government is investing in infrastructure."),
        w("facility", "/fəˈsɪləti/", "n", "tiện ích", "a place or service provided for a purpose", "The sports facility is open to everyone."),
        w("amenity", "/əˈmiːnəti/", "n", "tiện nghi", "a useful feature of a place", "The area has good local amenities."),
        w("cycle lane", "/ˈsaɪkl leɪn/", "n", "làn xe đạp", "a part of the road for bicycles", "The new cycle lane makes commuting safer."),
        w("plaza", "/ˈplɑːzə/", "n", "quảng trường", "a public square in a town", "People gather in the plaza at weekends."),
        w("fountain", "/ˈfaʊntən/", "n", "đài phun nước", "a structure that sends water into the air", "We met by the fountain in the square."),
        w("skyline", "/ˈskaɪlaɪn/", "n", "đường chân trời", "the outline of buildings against the sky", "The skyline is full of tall towers."),
      ],
    },
    {
      title: "Nông thôn & thiên nhiên",
      summary:
        "20 từ/cụm từ về làng quê, đồng ruộng, sông hồ và công việc nông nghiệp.",
      sections: [
        {
          title: "Làng quê và cảnh quan",
          body: `- **rural / countryside**: thuộc nông thôn / vùng nông thôn
- **village / hamlet**: ngôi làng / xóm nhỏ
- **farmland / field / meadow**: đất nông nghiệp / cánh đồng / đồng cỏ
- **valley / hill**: thung lũng / đồi
- **stream / pond / lake**: con suối / ao / hồ

Mẫu câu:
- **Rural** life is slower and quieter.
- The **village** sits in a green valley.`,
          remember: "countryside là vùng nông thôn nói chung; village là một ngôi làng cụ thể.",
        },
        {
          title: "Rừng và công việc đồng áng",
          body: `- **forest / wood**: rừng / khu rừng nhỏ
- **hedge / fence**: hàng rào cây / hàng rào
- **barn / farmhouse**: kho thóc / nhà nông trại
- **tractor / windmill**: máy kéo / cối xay gió

Mẫu câu:
- A **hedge** separates the two fields.
- The old **farmhouse** has thick stone walls.`,
          remember: "wood là rừng nhỏ; woods thường dùng ở số nhiều.",
        },
      ],
      words: [
        w("rural", "/ˈrʊərəl/", "adj", "thuộc nông thôn", "relating to the countryside", "Rural areas often have fewer buses."),
        w("countryside", "/ˈkʌntrisaɪd/", "n", "vùng nông thôn", "land outside towns and cities", "We drove through beautiful countryside."),
        w("village", "/ˈvɪlɪdʒ/", "n", "ngôi làng", "a small community in the countryside", "She grew up in a fishing village."),
        w("hamlet", "/ˈhæmlət/", "n", "xóm nhỏ", "a very small village", "The hamlet has only ten houses."),
        w("farmland", "/ˈfɑːmlænd/", "n", "đất nông nghiệp", "land used for growing crops", "The valley is rich farmland."),
        w("field", "/fiːld/", "n", "cánh đồng", "an area of land used for crops or animals", "The farmers are working in the field."),
        w("meadow", "/ˈmedəʊ/", "n", "đồng cỏ", "a field covered with grass and flowers", "The children played in the meadow."),
        w("valley", "/ˈvæli/", "n", "thung lũng", "low land between hills", "The river runs through the valley."),
        w("hill", "/hɪl/", "n", "đồi", "a raised area of land, smaller than a mountain", "Their house is on a small hill."),
        w("stream", "/striːm/", "n", "con suối", "a small narrow river", "A stream flows behind the cottage."),
        w("pond", "/pɒnd/", "n", "ao", "a small area of still water", "There are ducks on the pond."),
        w("lake", "/leɪk/", "n", "hồ", "a large area of water surrounded by land", "We swam in the lake every morning."),
        w("forest", "/ˈfɒrɪst/", "n", "rừng", "a large area covered with trees", "The forest is home to many animals."),
        w("wood", "/wʊd/", "n", "khu rừng nhỏ", "a small forest", "They walked through the wood."),
        w("hedge", "/hedʒ/", "n", "hàng rào cây", "a line of bushes forming a barrier", "He trimmed the hedge along the garden."),
        w("fence", "/fens/", "n", "hàng rào", "a barrier made of wood or wire", "The fence keeps the sheep inside."),
        w("barn", "/bɑːn/", "n", "kho thóc, chuồng trại", "a large farm building for animals or crops", "The hay is stored in the barn."),
        w("farmhouse", "/ˈfɑːmhaʊs/", "n", "nhà nông trại", "the main house on a farm", "They turned the old farmhouse into a hotel."),
        w("tractor", "/ˈtræktə(r)/", "n", "máy kéo", "a powerful vehicle used on farms", "The farmer drove the tractor across the field."),
        w("windmill", "/ˈwɪndmɪl/", "n", "cối xay gió", "a building with sails turned by the wind", "The old windmill is now a museum."),
      ],
    },
    {
      title: "So sánh thành phố & nông thôn",
      summary:
        "20 từ/cụm từ về nhịp sống, chi phí, cơ hội việc làm và ưu nhược điểm của hai nơi.",
      sections: [
        {
          title: "Nhịp sống và điều kiện sống",
          body: `- **quiet / safe**: yên tĩnh / an toàn
- **remote / isolated**: xa xôi / biệt lập
- **fresh air / close to nature**: không khí trong lành / gần gũi thiên nhiên
- **cost of living**: chi phí sinh hoạt
- **commute / convenient**: đi làm xa / thuận tiện

Mẫu câu:
- Country life is **quiet** and **close to nature**.
- The **cost of living** is higher in the city.`,
          remember: "commute là đi lại thường xuyên giữa nhà và nơi làm.",
        },
        {
          title: "Cơ hội và thách thức",
          body: `- **opportunity / nightlife**: cơ hội / cuộc sống về đêm
- **neighbourly**: thân thiện với hàng xóm
- **crime / crime rate**: tội phạm / tỷ lệ tội phạm
- **advantage / disadvantage**: lợi thế / bất lợi
- **migrate / migration / settle**: di cư / sự di cư / định cư
- **pace of life**: nhịp sống

Mẫu câu:
- The city offers more job **opportunities**.
- Many young people **migrate** to big cities.`,
          remember: "an advantage of something; a disadvantage of something.",
        },
      ],
      words: [
        w("quiet", "/ˈkwaɪət/", "adj", "yên tĩnh", "making little or no noise", "The village is very quiet at night."),
        w("remote", "/rɪˈməʊt/", "adj", "xa xôi", "far away from other places", "They live in a remote mountain area."),
        w("isolated", "/ˈaɪsəleɪtɪd/", "adj", "biệt lập", "separate and far from others", "The farm is isolated in winter."),
        w("fresh air", "/ˌfreʃ ˈeə(r)/", "n", "không khí trong lành", "clean outdoor air", "We went outside for some fresh air."),
        w("cost of living", "/ˌkɒst əv ˈlɪvɪŋ/", "n", "chi phí sinh hoạt", "the money needed for daily life", "The cost of living in the capital is high."),
        w("commute", "/kəˈmjuːt/", "v", "đi làm xa", "to travel regularly to work", "She commutes by train every day."),
        w("convenient", "/kənˈviːniənt/", "adj", "thuận tiện", "easy and useful for a purpose", "The flat is convenient for the station."),
        w("close to nature", "/ˌkləʊs tə ˈneɪtʃə(r)/", "phrase", "gần gũi thiên nhiên", "living near natural surroundings", "They moved to the countryside to be close to nature."),
        w("opportunity", "/ˌɒpəˈtjuːnəti/", "n", "cơ hội", "a chance to do something", "Cities offer more job opportunities."),
        w("nightlife", "/ˈnaɪtlaɪf/", "n", "cuộc sống về đêm", "entertainment available at night", "The city is famous for its nightlife."),
        w("neighbourly", "/ˈneɪbəli/", "adj", "thân thiện với hàng xóm", "friendly towards neighbours", "People here are very neighbourly."),
        w("safe", "/seɪf/", "adj", "an toàn", "not likely to be harmed", "The village feels safe at night."),
        w("crime", "/kraɪm/", "n", "tội phạm", "illegal activity", "Crime is lower in rural areas."),
        w("crime rate", "/ˈkraɪm reɪt/", "n", "tỷ lệ tội phạm", "the number of crimes in an area", "The crime rate has fallen this year."),
        w("disadvantage", "/ˌdɪsədˈvɑːntɪdʒ/", "n", "bất lợi", "a condition that makes something harder", "The main disadvantage is the long commute."),
        w("advantage", "/ədˈvɑːntɪdʒ/", "n", "lợi thế", "something that helps you", "One advantage of city life is public transport."),
        w("migrate", "/maɪˈɡreɪt/", "v", "di cư", "to move from one place to another", "Many families migrate to the city for work."),
        w("migration", "/maɪˈɡreɪʃn/", "n", "sự di cư", "the movement of people to a new place", "Migration from villages is increasing."),
        w("settle", "/ˈsetl/", "v", "định cư", "to start living permanently in a place", "They settled in a small town by the sea."),
        w("pace of life", "/ˌpeɪs əv ˈlaɪf/", "n", "nhịp sống", "how fast daily life feels", "The pace of life is slower in the countryside."),
      ],
    },
    {
      title: "Đô thị hóa & quy hoạch",
      summary:
        "20 từ/cụm từ về phát triển đô thị, quy hoạch, xây dựng và các vấn đề nhà ở.",
      sections: [
        {
          title: "Phát triển và quy hoạch",
          body: `- **urbanisation / development**: sự đô thị hóa / sự phát triển
- **planning / zone**: quy hoạch / khu vực
- **residential / commercial / industrial**: dân cư / thương mại / công nghiệp
- **construction / demolish**: việc xây dựng / phá dỡ
- **renovate / regenerate**: cải tạo / tái tạo

Mẫu câu:
- Rapid **urbanisation** has changed the region.
- The old factory site is being **regenerated**.`,
          remember: "residential area là khu dân cư; commercial area là khu thương mại.",
        },
        {
          title: "Nhà ở và dân cư",
          body: `- **overcrowded / shortage**: quá đông đúc / sự thiếu hụt
- **affordable / housing**: giá phải chăng / nhà ở
- **slum / outskirts**: khu ổ chuột / vùng ngoại vi
- **relocate / green space**: di dời / không gian xanh
- **pedestrianise**: dành cho người đi bộ

Mẫu câu:
- There is a serious **shortage** of **affordable housing**.
- The council plans to create more **green space**.`,
          remember: "affordable housing là nhà ở với giá người dân có thể chi trả.",
        },
      ],
      words: [
        w("urbanisation", "/ˌɜːbənaɪˈzeɪʃn/", "n", "sự đô thị hóa", "the growth of towns and cities", "Urbanisation has increased demand for housing."),
        w("development", "/dɪˈveləpmənt/", "n", "sự phát triển", "the process of growing or building", "The development of the area took ten years."),
        w("planning", "/ˈplænɪŋ/", "n", "quy hoạch", "the process of deciding how land is used", "The planning department approved the new flats."),
        w("zone", "/zəʊn/", "n", "khu vực", "an area used for a particular purpose", "This is a pedestrian zone."),
        w("residential", "/ˌrezɪˈdenʃl/", "adj", "dân cư", "used for homes rather than businesses", "They live in a quiet residential area."),
        w("commercial", "/kəˈmɜːʃl/", "adj", "thương mại", "relating to business and trade", "The commercial centre is full of offices."),
        w("industrial", "/ɪnˈdʌstriəl/", "adj", "công nghiệp", "relating to factories and industry", "The industrial zone is outside the city."),
        w("construction", "/kənˈstrʌkʃn/", "n", "việc xây dựng", "the work of building something", "The construction of the bridge took three years."),
        w("demolish", "/dɪˈmɒlɪʃ/", "v", "phá dỡ", "to destroy a building completely", "They demolished the old cinema."),
        w("renovate", "/ˈrenəveɪt/", "v", "cải tạo", "to repair and modernise a building", "We renovated the kitchen last year."),
        w("regenerate", "/rɪˈdʒenəreɪt/", "v", "tái tạo", "to improve an area that was in bad condition", "The council wants to regenerate the old port."),
        w("overcrowded", "/ˌəʊvəˈkraʊdɪd/", "adj", "quá đông đúc", "containing too many people", "The buses are overcrowded at rush hour."),
        w("shortage", "/ˈʃɔːtɪdʒ/", "n", "sự thiếu hụt", "a situation where there is not enough of something", "There is a shortage of affordable homes."),
        w("affordable", "/əˈfɔːdəbl/", "adj", "giá phải chăng", "cheap enough for ordinary people", "The city needs more affordable housing."),
        w("housing", "/ˈhaʊzɪŋ/", "n", "nhà ở", "buildings for people to live in", "Housing prices have risen sharply."),
        w("slum", "/slʌm/", "n", "khu ổ chuột", "a poor and overcrowded area", "The charity works in the city's slums."),
        w("relocate", "/ˌriːləʊˈkeɪt/", "v", "di dời", "to move to a different place", "The families were relocated to new flats."),
        w("green space", "/ˌɡriːn ˈspeɪs/", "n", "không gian xanh", "public land with grass and trees", "Green space is important for city residents."),
        w("pedestrianise", "/pəˈdestriənaɪz/", "v", "dành cho người đi bộ", "to make a street for pedestrians only", "They pedestrianised the main shopping street."),
        w("outskirts", "/ˈaʊtskɜːts/", "n", "vùng ngoại vi", "the outer parts of a town", "They live on the outskirts of the city."),
      ],
    },
  ],
};
