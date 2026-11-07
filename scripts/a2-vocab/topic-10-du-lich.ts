import { w } from "./helpers";
import type { SeedVocabTopic } from "../curriculum-data";

/** Chủ đề 10: Du lịch & kỳ nghỉ. */
export const TOPIC_10: SeedVocabTopic = {
  name: "Du lịch & kỳ nghỉ",
  slug: "du-lich-ky-nghi",
  icon: "flight_takeoff",
  description:
    "Từ vựng về lên kế hoạch chuyến đi, sân bay, khách sạn, tham quan và xử lý sự cố khi du lịch.",
  lessons: [
    {
      title: "Lên kế hoạch chuyến đi",
      summary:
        "20 từ/cụm từ về điểm đến, lịch trình, đặt vé, thủ tục và chuẩn bị cho chuyến đi.",
      sections: [
        {
          title: "Chọn điểm đến",
          body: `- **destination**: điểm đến
- **itinerary**: lịch trình chuyến đi
- **travel agency**: đại lý du lịch
- **package holiday**: tour trọn gói
- **booking**: việc đặt chỗ
- **reserve**: đặt trước

Mẫu câu:
- Our next **destination** is Da Nang.
- The **itinerary** includes three cities.`,
          remember: "destination là nơi đến; departure là nơi/giờ khởi hành.",
        },
        {
          title: "Giấy tờ và vé",
          body: `- **departure / arrival**: khởi hành / đến
- **return ticket / one-way**: vé khứ hồi / vé một chiều
- **round trip**: chuyến đi khứ hồi
- **check-in**: làm thủ tục
- **boarding pass**: thẻ lên máy bay
- **visa / insurance**: thị thực / bảo hiểm

Mẫu câu:
- I booked a **return ticket** to Bangkok.
- Don't forget your **travel insurance**.`,
          remember: "a one-way ticket chỉ đi một chiều; return ticket đi và về.",
        },
      ],
      words: [
        w("destination", "/ˌdestɪˈneɪʃn/", "n", "điểm đến", "the place you are travelling to", "Paris is a popular destination for tourists."),
        w("itinerary", "/aɪˈtɪnərəri/", "n", "lịch trình chuyến đi", "a plan of a journey", "Our itinerary includes two days in Rome."),
        w("travel agency", "/ˈtrævl eɪdʒənsi/", "n", "đại lý du lịch", "a company that arranges trips", "We booked the tour through a travel agency."),
        w("package holiday", "/ˈpækɪdʒ hɒlədeɪ/", "n", "tour trọn gói", "a holiday with travel and hotel included", "A package holiday is easier to organise."),
        w("booking", "/ˈbʊkɪŋ/", "n", "việc đặt chỗ", "an arrangement made in advance", "I have a hotel booking for two nights."),
        w("reserve", "/rɪˈzɜːv/", "v", "đặt trước", "to arrange to keep something for later", "We reserved a table by the window."),
        w("departure", "/dɪˈpɑːtʃə(r)/", "n", "sự khởi hành", "the act of leaving a place", "The departure time is six in the morning."),
        w("arrival", "/əˈraɪvl/", "n", "sự đến nơi", "the act of reaching a place", "Our arrival was delayed by an hour."),
        w("return ticket", "/rɪˈtɜːn tɪkɪt/", "n", "vé khứ hồi", "a ticket for a journey there and back", "A return ticket is cheaper than two singles."),
        w("one-way", "/ˌwʌn ˈweɪ/", "adj", "một chiều", "travelling in one direction only", "I bought a one-way ticket to Berlin."),
        w("round trip", "/ˌraʊnd ˈtrɪp/", "n", "chuyến đi khứ hồi", "a journey to a place and back", "The round trip takes about four hours."),
        w("check-in", "/ˈtʃek ɪn/", "n", "thủ tục nhận phòng/lên máy bay", "the process of registering at a hotel or airport", "Check-in opens two hours before the flight."),
        w("boarding pass", "/ˈbɔːdɪŋ pɑːs/", "n", "thẻ lên máy bay", "a document allowing you to board a plane", "Show your boarding pass at the gate."),
        w("gate", "/ɡeɪt/", "n", "cổng lên máy bay", "the place where you board a flight", "Our flight leaves from gate twelve."),
        w("customs", "/ˈkʌstəmz/", "n", "hải quan", "the place where goods are checked at a border", "We went through customs quickly."),
        w("visa", "/ˈviːzə/", "n", "thị thực", "an official permit to enter a country", "You need a visa to visit that country."),
        w("insurance", "/ɪnˈʃʊərəns/", "n", "bảo hiểm", "protection against loss or accidents", "Travel insurance covers medical costs."),
        w("souvenir", "/ˌsuːvəˈnɪə(r)/", "n", "quà lưu niệm", "something you buy to remember a place", "I bought a small souvenir for my sister."),
        w("guidebook", "/ˈɡaɪdbʊk/", "n", "sách hướng dẫn du lịch", "a book with information about a place", "The guidebook recommends a quiet beach."),
        w("abroad", "/əˈbrɔːd/", "adv", "ở nước ngoài", "in or to another country", "She travels abroad every summer."),
      ],
    },
    {
      title: "Ở sân bay & nhà ga",
      summary:
        "20 từ/cụm từ về chuyến bay, thủ tục an ninh, hành lý, ghế ngồi và những trải nghiệm khi bay.",
      sections: [
        {
          title: "Chuyến bay",
          body: `- **flight / airline**: chuyến bay / hãng hàng không
- **take off / land**: cất cánh / hạ cánh
- **terminal / runway**: nhà ga sân bay / đường băng
- **crew**: phi hành đoàn
- **connecting flight**: chuyến bay nối tiếp

Mẫu câu:
- The **flight** to Tokyo takes six hours.
- We had to run to catch our **connecting flight**.`,
          remember: "take off và land là động từ; take-off và landing là danh từ.",
        },
        {
          title: "An ninh và hành lý",
          body: `- **security**: an ninh
- **passport control**: kiểm soát hộ chiếu
- **baggage / hand luggage**: hành lý ký gửi / hành lý xách tay
- **check-in desk**: quầy làm thủ tục
- **departure lounge**: phòng chờ
- **seat belt**: dây an toàn
- **aisle / window seat**: ghế sát lối đi / ghế cửa sổ

Mẫu câu:
- Please fasten your **seat belt**.
- I prefer an **aisle seat**.`,
          remember: "luggage và baggage không đếm được; hand luggage là hành lý xách tay.",
        },
      ],
      words: [
        w("flight", "/flaɪt/", "n", "chuyến bay", "a journey by plane", "Our flight was delayed by two hours."),
        w("airline", "/ˈeəlaɪn/", "n", "hãng hàng không", "a company that operates flights", "This airline offers cheap fares."),
        w("take off", "/ˌteɪk ˈɒf/", "phr v", "cất cánh", "to leave the ground and start flying", "The plane took off on time."),
        w("land", "/lænd/", "v", "hạ cánh", "to come down to the ground", "We landed safely in Singapore."),
        w("boarding", "/ˈbɔːdɪŋ/", "n", "việc lên máy bay", "the act of getting on a plane", "Boarding starts at half past six."),
        w("security", "/sɪˈkjʊərəti/", "n", "an ninh", "checks to keep people safe at an airport", "We passed through security quickly."),
        w("passport control", "/ˈpɑːspɔːt kəntrəʊl/", "n", "kiểm soát hộ chiếu", "the place where officials check passports", "There was a long queue at passport control."),
        w("baggage", "/ˈbæɡɪdʒ/", "n", "hành lý", "bags and suitcases taken on a journey", "Our baggage arrived on a later flight."),
        w("hand luggage", "/ˌhænd ˈlʌɡɪdʒ/", "n", "hành lý xách tay", "small bags you carry onto the plane", "Hand luggage must fit under the seat."),
        w("check-in desk", "/ˈtʃek ɪn desk/", "n", "quầy làm thủ tục", "the place where you check in at an airport", "Go to the check-in desk with your passport."),
        w("departure lounge", "/dɪˈpɑːtʃə laʊndʒ/", "n", "phòng chờ khởi hành", "the area where passengers wait for flights", "We waited in the departure lounge."),
        w("terminal", "/ˈtɜːmɪnl/", "n", "nhà ga sân bay", "a building at an airport for passengers", "The flight leaves from Terminal 2."),
        w("crew", "/kruː/", "n", "phi hành đoàn", "the people who work on a plane or ship", "The crew welcomed us on board."),
        w("seat belt", "/ˈsiːt belt/", "n", "dây an toàn", "a strap that keeps you safe in your seat", "Please fasten your seat belt."),
        w("aisle", "/aɪl/", "n", "lối đi giữa các ghế", "the narrow passage between seats", "Could I have an aisle seat?"),
        w("window seat", "/ˈwɪndəʊ siːt/", "n", "ghế cạnh cửa sổ", "a seat next to the window", "She chose a window seat to enjoy the view."),
        w("connecting flight", "/kəˈnektɪŋ flaɪt/", "n", "chuyến bay nối tiếp", "a second flight that continues your journey", "We missed our connecting flight."),
        w("jet lag", "/ˈdʒet læɡ/", "n", "sự mệt mỏi do lệch múi giờ", "tiredness after flying across time zones", "It took me days to get over jet lag."),
        w("turbulence", "/ˈtɜːbjələns/", "n", "sự rung lắc của máy bay", "unsteady air that shakes a plane", "The turbulence made me feel sick."),
        w("runway", "/ˈrʌnweɪ/", "n", "đường băng", "the long strip where planes take off and land", "The plane waited on the runway."),
      ],
    },
    {
      title: "Khách sạn & tham quan",
      summary:
        "20 từ/cụm từ về nơi lưu trú, nhận phòng, điểm tham quan và trải nghiệm văn hóa địa phương.",
      sections: [
        {
          title: "Nơi lưu trú",
          body: `- **resort**: khu nghỉ dưỡng
- **guesthouse**: nhà nghỉ nhỏ
- **check in / check out**: nhận phòng / trả phòng
- **single / double room**: phòng đơn / phòng đôi
- **room service**: dịch vụ phòng
- **lobby**: sảnh khách sạn
- **concierge**: nhân viên hỗ trợ khách

Mẫu câu:
- We stayed at a beach **resort**.
- **Check-out** is at eleven o'clock.`,
          remember: "check in là nhận phòng; check out là trả phòng.",
        },
        {
          title: "Tham quan",
          body: `- **sightseeing**: việc ngắm cảnh
- **tour guide**: hướng dẫn viên
- **guided tour**: tour có hướng dẫn
- **landmark / monument**: địa danh nổi tiếng / tượng đài
- **gallery**: phòng triển lãm nghệ thuật
- **attraction**: điểm thu hút khách
- **excursion**: chuyến tham quan ngắn

Mẫu câu:
- We spent the morning **sightseeing**.
- The cathedral is the city's most famous **landmark**.`,
          remember: "sightseeing là hoạt động ngắm cảnh; sight là cảnh nhìn thấy.",
        },
      ],
      words: [
        w("resort", "/rɪˈzɔːt/", "n", "khu nghỉ dưỡng", "a place where people go on holiday", "The resort has three swimming pools."),
        w("guesthouse", "/ˈɡesthaʊs/", "n", "nhà nghỉ nhỏ", "a small hotel, often run by a family", "We stayed in a friendly guesthouse."),
        w("check in", "/ˌtʃek ˈɪn/", "phr v", "nhận phòng", "to register at a hotel", "We checked in at three o'clock."),
        w("check out", "/ˌtʃek ˈaʊt/", "phr v", "trả phòng", "to leave a hotel after paying", "We need to check out before noon."),
        w("room service", "/ˈruːm sɜːvɪs/", "n", "dịch vụ phòng", "food brought to your hotel room", "We ordered breakfast from room service."),
        w("single room", "/ˈsɪŋɡl ruːm/", "n", "phòng đơn", "a hotel room for one person", "I booked a single room for two nights."),
        w("double room", "/ˈdʌbl ruːm/", "n", "phòng đôi", "a hotel room with a double bed", "They asked for a double room with a view."),
        w("view", "/vjuː/", "n", "tầm nhìn, cảnh", "what you can see from a place", "Our room has a view of the sea."),
        w("sightseeing", "/ˈsaɪtsiːɪŋ/", "n", "việc ngắm cảnh", "visiting interesting places", "We went sightseeing by bus."),
        w("tour guide", "/ˈtʊə ɡaɪd/", "n", "hướng dẫn viên du lịch", "a person who shows visitors around", "The tour guide spoke excellent English."),
        w("landmark", "/ˈlændmɑːk/", "n", "địa danh nổi tiếng", "a famous building or place", "The tower is a well-known landmark."),
        w("monument", "/ˈmɒnjumənt/", "n", "tượng đài, di tích", "a structure built to remember a person or event", "We visited a monument to the war dead."),
        w("gallery", "/ˈɡæləri/", "n", "phòng triển lãm nghệ thuật", "a place where art is shown", "The gallery is free on Sundays."),
        w("attraction", "/əˈtrækʃn/", "n", "điểm thu hút", "a place that tourists want to visit", "The castle is the main attraction in the area."),
        w("tourist", "/ˈtʊərɪst/", "n", "khách du lịch", "a person who travels for pleasure", "The old town is always full of tourists."),
        w("brochure", "/ˈbrəʊʃə(r)/", "n", "tờ rơi quảng cáo", "a thin book with information about holidays", "We picked up a brochure at the hotel."),
        w("excursion", "/ɪkˈskɜːʃn/", "n", "chuyến tham quan ngắn", "a short organised trip", "We booked an excursion to the islands."),
        w("guided tour", "/ˌɡaɪdɪd ˈtʊə(r)/", "n", "tour có hướng dẫn", "a tour led by a guide", "The guided tour lasts two hours."),
        w("lobby", "/ˈlɒbi/", "n", "sảnh khách sạn", "the large entrance area of a hotel", "We met in the hotel lobby."),
        w("concierge", "/ˈkɒnsieəʒ/", "n", "nhân viên hỗ trợ khách sạn", "a hotel employee who helps guests", "The concierge booked us a taxi."),
      ],
    },
    {
      title: "Sự cố khi du lịch",
      summary:
        "20 từ/cụm từ về mất đồ, trộm cắp, hỏng xe, chậm chuyến và cách nhờ trợ giúp khẩn cấp.",
      sections: [
        {
          title: "Mất đồ và trộm cắp",
          body: `- **lost / missing**: bị mất / thất lạc
- **stolen**: bị đánh cắp
- **pickpocket**: kẻ móc túi
- **lost luggage**: hành lý thất lạc
- **embassy / consulate**: đại sứ quán / lãnh sự quán
- **police station**: đồn cảnh sát

Mẫu câu:
- My wallet was **stolen** on the train.
- We reported the theft at the **police station**.`,
          remember: "be stolen là bị trộm; be lost là bị mất (có thể do mình).",
        },
        {
          title: "Sự cố giao thông và sức khỏe",
          body: `- **missed flight**: lỡ chuyến bay
- **cancellation**: việc hủy chuyến
- **strike**: cuộc đình công
- **traffic jam**: tắc đường
- **breakdown**: hỏng xe
- **stranded**: bị mắc kẹt
- **sunburn / sunstroke**: cháy nắng / say nắng
- **dehydrated**: mất nước

Mẫu câu:
- We missed our **connecting flight** and were **stranded** at the airport.
- The bus **broke down** in the middle of nowhere.`,
          remember: "breakdown là danh từ; break down là động từ.",
        },
      ],
      words: [
        w("lost", "/lɒst/", "adj", "bị mất", "missing and unable to be found", "I reported my lost passport immediately."),
        w("missing", "/ˈmɪsɪŋ/", "adj", "thất lạc", "not in the usual place", "One of my bags is missing."),
        w("stolen", "/ˈstəʊlən/", "adj", "bị đánh cắp", "taken illegally", "Her camera was stolen from the hotel."),
        w("pickpocket", "/ˈpɪkpɒkɪt/", "n", "kẻ móc túi", "a person who steals from pockets or bags", "Watch out for pickpockets in crowded places."),
        w("embassy", "/ˈembəsi/", "n", "đại sứ quán", "the official office of a country abroad", "Contact your embassy if you lose your passport."),
        w("consulate", "/ˈkɒnsjələt/", "n", "lãnh sự quán", "a smaller official office abroad", "The consulate helped us get a temporary passport."),
        w("emergency", "/ɪˈmɜːdʒənsi/", "n", "tình huống khẩn cấp", "a serious situation needing immediate action", "Call this number in an emergency."),
        w("police station", "/pəˈliːs steɪʃn/", "n", "đồn cảnh sát", "the local office of the police", "We went to the police station to report the theft."),
        w("claim", "/kleɪm/", "v/n", "yêu cầu bồi thường; yêu cầu", "to ask for money from an insurance company", "We claimed for the lost luggage."),
        w("compensation", "/ˌkɒmpenˈseɪʃn/", "n", "tiền bồi thường", "money paid because of loss or damage", "The airline offered us compensation."),
        w("sunburn", "/ˈsʌnbɜːn/", "n", "cháy nắng", "red painful skin caused by the sun", "She got bad sunburn on the first day."),
        w("sunstroke", "/ˈsʌnstrəʊk/", "n", "say nắng", "illness caused by too much heat", "Drink water to avoid sunstroke."),
        w("dehydrated", "/ˌdiːhaɪˈdreɪtɪd/", "adj", "bị mất nước", "having lost too much water from the body", "I felt weak and dehydrated after the hike."),
        w("lost luggage", "/ˌlɒst ˈlʌɡɪdʒ/", "n", "hành lý thất lạc", "bags that do not arrive with a passenger", "The airline is still looking for our lost luggage."),
        w("missed flight", "/ˌmɪst ˈflaɪt/", "n", "chuyến bay bị lỡ", "a flight you did not catch", "A traffic jam caused us to miss our flight."),
        w("cancellation", "/ˌkænsəˈleɪʃn/", "n", "việc hủy chuyến", "the act of stopping a planned service", "The storm led to the cancellation of many flights."),
        w("strike", "/straɪk/", "n", "cuộc đình công", "a protest in which workers stop working", "The train strike lasted two days."),
        w("traffic jam", "/ˈtræfɪk dʒæm/", "n", "tắc đường", "a long line of cars that cannot move", "We were stuck in a traffic jam for an hour."),
        w("breakdown", "/ˈbreɪkdaʊn/", "n", "sự hỏng xe", "a vehicle failure", "We had a breakdown on the motorway."),
        w("stranded", "/ˈstrændɪd/", "adj", "bị mắc kẹt", "unable to leave a place", "Hundreds of passengers were stranded at the airport."),
      ],
    },
  ],
};
