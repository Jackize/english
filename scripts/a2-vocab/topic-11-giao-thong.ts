import { w } from "./helpers";
import type { SeedVocabTopic } from "../curriculum-data";

/** Chủ đề 11: Giao thông & di chuyển. */
export const TOPIC_11: SeedVocabTopic = {
  name: "Giao thông & di chuyển",
  slug: "giao-thong-di-chuyen",
  icon: "directions_car",
  description:
    "Từ vựng về phương tiện, đường sá, luật giao thông và đi lại bằng phương tiện công cộng.",
  lessons: [
    {
      title: "Phương tiện di chuyển",
      summary:
        "20 từ/cụm từ về các loại xe, tàu, thuyền và phương tiện công cộng thường gặp.",
      sections: [
        {
          title: "Phương tiện cá nhân",
          body: `- **vehicle**: phương tiện
- **scooter**: xe máy nhỏ, xe tay ga
- **bicycle**: xe đạp
- **carriage**: toa tàu
- **caravan**: xe nhà di động

Mẫu câu:
- More people are using **bicycles** in the city.
- They travelled across the country in a **caravan**.`,
          remember: "vehicle là từ chung cho mọi phương tiện, không chỉ ô tô.",
        },
        {
          title: "Phương tiện công cộng",
          body: `- **coach**: xe khách đường dài
- **tram / subway / underground**: tàu điện / tàu điện ngầm
- **ferry / boat / ship**: phà / thuyền / tàu
- **minibus**: xe buýt nhỏ
- **cable car**: cáp treo

Mẫu câu:
- We took the **ferry** to the island.
- The **underground** is faster than driving.`,
          remember: "subway (Mỹ) và underground (Anh) đều là tàu điện ngầm.",
        },
      ],
      words: [
        w("vehicle", "/ˈviːəkl/", "n", "phương tiện", "a machine used for transport", "No vehicles are allowed in the old town."),
        w("scooter", "/ˈskuːtə(r)/", "n", "xe tay ga", "a small motorbike or a child's vehicle", "She rides a scooter to work."),
        w("bicycle", "/ˈbaɪsɪkl/", "n", "xe đạp", "a vehicle with two wheels powered by pedals", "I go to school by bicycle."),
        w("coach", "/kəʊtʃ/", "n", "xe khách đường dài", "a comfortable bus for long journeys", "We took a coach to Edinburgh."),
        w("tram", "/træm/", "n", "tàu điện", "an electric vehicle that runs on rails in a city", "The tram stops outside the market."),
        w("subway", "/ˈsʌbweɪ/", "n", "tàu điện ngầm (Mỹ)", "an underground railway system", "The subway is busy in the morning."),
        w("underground", "/ˈʌndəɡraʊnd/", "n", "tàu điện ngầm (Anh)", "the London underground railway", "Take the underground to the museum."),
        w("ferry", "/ˈferi/", "n", "phà", "a boat that carries people across water", "The ferry leaves every hour."),
        w("boat", "/bəʊt/", "n", "thuyền", "a small vehicle for travelling on water", "We rented a boat for the afternoon."),
        w("ship", "/ʃɪp/", "n", "tàu lớn", "a large boat for sea travel", "The ship crossed the ocean in five days."),
        w("helicopter", "/ˈhelɪkɒptə(r)/", "n", "trực thăng", "an aircraft with rotating blades", "A helicopter rescued the climbers."),
        w("lorry", "/ˈlɒri/", "n", "xe tải (Anh)", "a large vehicle for carrying goods", "A lorry blocked the road."),
        w("truck", "/trʌk/", "n", "xe tải (Mỹ)", "a large vehicle for carrying goods", "The truck delivered furniture to our house."),
        w("van", "/væn/", "n", "xe tải nhỏ", "a covered vehicle for carrying goods", "They moved the boxes in a van."),
        w("carriage", "/ˈkærɪdʒ/", "n", "toa tàu", "one of the separate parts of a train", "We sat in the last carriage."),
        w("cable car", "/ˈkeɪbl kɑː(r)/", "n", "cáp treo", "a vehicle hanging from a moving cable", "The cable car offers amazing views."),
        w("minibus", "/ˈmɪnibʌs/", "n", "xe buýt nhỏ", "a small bus for about twelve people", "A minibus took us to the hotel."),
        w("ambulance", "/ˈæmbjələns/", "n", "xe cứu thương", "a vehicle that takes sick people to hospital", "Someone called an ambulance."),
        w("fire engine", "/ˈfaɪər endʒɪn/", "n", "xe cứu hỏa", "a vehicle used by firefighters", "The fire engine arrived within minutes."),
        w("caravan", "/ˈkærəvæn/", "n", "xe nhà di động", "a vehicle you can live in on holiday", "We spent the summer in a caravan."),
      ],
    },
    {
      title: "Đường sá & chỉ đường",
      summary:
        "20 từ/cụm từ về các loại đường, nút giao, biển báo và cách hỏi hoặc chỉ đường.",
      sections: [
        {
          title: "Các loại đường",
          body: `- **avenue**: đại lộ
- **lane**: làn đường, ngõ nhỏ
- **pavement / sidewalk**: vỉa hè
- **motorway / highway**: đường cao tốc
- **bridge / tunnel**: cầu / hầm
- **alley**: ngõ hẹp

Mẫu câu:
- Walk on the **pavement**, not in the road.
- The **tunnel** connects the two sides of the river.`,
          remember: "pavement (Anh) = sidewalk (Mỹ): vỉa hè dành cho người đi bộ.",
        },
        {
          title: "Nút giao và chỉ đường",
          body: `- **crossroads / junction**: ngã tư / nút giao
- **roundabout**: vòng xuyến
- **traffic lights / zebra crossing**: đèn giao thông / vạch qua đường
- **sign / direction**: biển báo / hướng
- **turn left / go straight**: rẽ trái / đi thẳng
- **corner**: góc phố

Mẫu câu:
- Go **straight** and turn left at the **roundabout**.
- The shop is on the **corner** of the street.`,
          remember: "go straight on (Anh) / go straight (Mỹ) — đi thẳng.",
        },
      ],
      words: [
        w("avenue", "/ˈævənjuː/", "n", "đại lộ", "a wide street in a city", "They live on a tree-lined avenue."),
        w("lane", "/leɪn/", "n", "làn đường, ngõ nhỏ", "a narrow road or part of a road", "Stay in the left lane."),
        w("pavement", "/ˈpeɪvmənt/", "n", "vỉa hè (Anh)", "the path beside a road for pedestrians", "Please walk on the pavement."),
        w("sidewalk", "/ˈsaɪdwɔːk/", "n", "vỉa hè (Mỹ)", "the path beside a road", "The sidewalk was covered with leaves."),
        w("crossroads", "/ˈkrɒsrəʊdz/", "n", "ngã tư", "a place where two roads cross", "Turn right at the crossroads."),
        w("junction", "/ˈdʒʌŋkʃn/", "n", "nút giao", "a place where roads or railway lines meet", "The accident happened at a busy junction."),
        w("roundabout", "/ˈraʊndəbaʊt/", "n", "vòng xuyến", "a circular junction where roads meet", "Take the second exit at the roundabout."),
        w("traffic lights", "/ˈtræfɪk laɪts/", "n", "đèn giao thông", "coloured lights that control traffic", "Stop at the traffic lights."),
        w("zebra crossing", "/ˌzebrə ˈkrɒsɪŋ/", "n", "vạch qua đường", "a place marked with white stripes for crossing", "Drivers must stop at a zebra crossing."),
        w("bridge", "/brɪdʒ/", "n", "cây cầu", "a structure built over a river or road", "We walked across the old bridge."),
        w("tunnel", "/ˈtʌnl/", "n", "đường hầm", "a passage under the ground", "The train went through a long tunnel."),
        w("motorway", "/ˈməʊtəweɪ/", "n", "đường cao tốc (Anh)", "a wide road for fast traffic", "The motorway was closed because of snow."),
        w("highway", "/ˈhaɪweɪ/", "n", "đường cao tốc (Mỹ)", "a main road between cities", "We drove along the highway for hours."),
        w("sign", "/saɪn/", "n", "biển báo", "a board with information or a warning", "The sign pointed to the station."),
        w("direction", "/dəˈrekʃn/", "n", "hướng", "the way something is moving or pointing", "We went in the wrong direction."),
        w("turn left", "/ˌtɜːn ˈleft/", "phrase", "rẽ trái", "to change direction to the left", "Turn left after the bank."),
        w("go straight", "/ˌɡəʊ ˈstreɪt/", "phrase", "đi thẳng", "to continue without turning", "Go straight for two blocks."),
        w("corner", "/ˈkɔːnə(r)/", "n", "góc phố", "the place where two streets meet", "The café is on the corner."),
        w("path", "/pɑːθ/", "n", "lối đi", "a narrow way for walking", "A path leads down to the beach."),
        w("alley", "/ˈæli/", "n", "ngõ hẹp", "a narrow street between buildings", "We found a small restaurant in an alley."),
      ],
    },
    {
      title: "Giao thông & luật lệ",
      summary:
        "20 từ/cụm từ về tắc đường, tốc độ, đỗ xe, nhiên liệu, tai nạn và người tham gia giao thông.",
      sections: [
        {
          title: "Tắc đường và quy định",
          body: `- **traffic / congestion**: giao thông / sự tắc nghẽn
- **rush hour**: giờ cao điểm
- **speed limit**: giới hạn tốc độ
- **fine**: tiền phạt
- **parking / car park**: việc đỗ xe / bãi đỗ xe
- **driving licence**: bằng lái xe

Mẫu câu:
- Avoid the city centre during **rush hour**.
- The **speed limit** here is fifty kilometres an hour.`,
          remember: "fine là tiền phạt; penalty là hình phạt nói chung.",
        },
        {
          title: "Nhiên liệu và an toàn",
          body: `- **petrol station / fuel**: trạm xăng / nhiên liệu
- **petrol / diesel**: xăng / dầu diesel
- **electric car / charging point**: ô tô điện / trạm sạc
- **accident / collision**: tai nạn / vụ va chạm
- **pedestrian / cyclist**: người đi bộ / người đi xe đạp
- **overtake / brake**: vượt xe / phanh

Mẫu câu:
- We need to stop at the next **petrol station**.
- The **cyclist** was not injured.`,
          remember: "overtake là vượt qua xe khác; take over là tiếp quản.",
        },
      ],
      words: [
        w("traffic", "/ˈtræfɪk/", "n", "giao thông, xe cộ", "the vehicles moving on a road", "The traffic was terrible this morning."),
        w("congestion", "/kənˈdʒestʃən/", "n", "sự tắc nghẽn", "a situation where roads are too full", "The new road should reduce congestion."),
        w("rush hour", "/ˈrʌʃ aʊə(r)/", "n", "giờ cao điểm", "the busiest time for travel", "I never drive during rush hour."),
        w("speed limit", "/ˈspiːd lɪmɪt/", "n", "giới hạn tốc độ", "the fastest speed allowed on a road", "He was driving over the speed limit."),
        w("fine", "/faɪn/", "n/v", "tiền phạt; phạt tiền", "money paid as a punishment", "She got a fine for parking there."),
        w("parking", "/ˈpɑːkɪŋ/", "n", "việc đỗ xe", "the act of leaving a vehicle somewhere", "Parking is free on Sundays."),
        w("car park", "/ˈkɑː pɑːk/", "n", "bãi đỗ xe", "an area for parking cars", "The car park is behind the station."),
        w("petrol station", "/ˈpetrəl steɪʃn/", "n", "trạm xăng", "a place where you buy fuel for cars", "We stopped at a petrol station."),
        w("fuel", "/ˈfjuːəl/", "n", "nhiên liệu", "a substance used to produce energy", "The car is low on fuel."),
        w("petrol", "/ˈpetrəl/", "n", "xăng (Anh)", "fuel used in most cars", "Petrol prices have risen again."),
        w("diesel", "/ˈdiːzl/", "n", "dầu diesel", "a type of fuel used in some engines", "This van runs on diesel."),
        w("electric car", "/ɪˌlektrɪk ˈkɑː(r)/", "n", "ô tô điện", "a car powered by electricity", "Electric cars are becoming cheaper."),
        w("charging point", "/ˈtʃɑːdʒɪŋ pɔɪnt/", "n", "trạm sạc", "a place where an electric vehicle is charged", "There is a charging point at the supermarket."),
        w("driving licence", "/ˈdraɪvɪŋ laɪsns/", "n", "bằng lái xe", "an official document allowing you to drive", "You must carry your driving licence."),
        w("accident", "/ˈæksɪdənt/", "n", "tai nạn", "an unexpected event causing damage or injury", "There was an accident on the motorway."),
        w("collision", "/kəˈlɪʒn/", "n", "vụ va chạm", "an accident in which vehicles hit each other", "Two cars were involved in the collision."),
        w("pedestrian", "/pəˈdestriən/", "n", "người đi bộ", "a person walking in the street", "Pedestrians should use the crossing."),
        w("cyclist", "/ˈsaɪklɪst/", "n", "người đi xe đạp", "a person who rides a bicycle", "The city has new lanes for cyclists."),
        w("overtake", "/ˌəʊvəˈteɪk/", "v", "vượt xe", "to pass another vehicle on the road", "It is dangerous to overtake on a bend."),
        w("brake", "/breɪk/", "v/n", "phanh; phanh xe", "to slow or stop a vehicle", "He braked suddenly to avoid the dog."),
      ],
    },
    {
      title: "Đi lại công cộng",
      summary:
        "20 từ/cụm từ về vé, sân ga, tuyến xe, giờ cao điểm và những tình huống khi đi tàu xe.",
      sections: [
        {
          title: "Vé và sân ga",
          body: `- **fare**: giá vé
- **ticket office**: quầy bán vé
- **platform**: sân ga
- **single / season ticket**: vé một lượt / vé dài hạn
- **peak / off-peak**: giờ cao điểm / giờ thấp điểm
- **terminus**: bến cuối

Mẫu câu:
- The **fare** to the airport is five pounds.
- Our train leaves from **platform** three.`,
          remember: "fare là tiền vé; ticket là tấm vé.",
        },
        {
          title: "Lên xuống và chuyển tuyến",
          body: `- **route / line**: tuyến đường / tuyến tàu xe
- **stop**: điểm dừng
- **passenger / commuter**: hành khách / người đi làm bằng xe công cộng
- **board / get on / get off**: lên tàu xe / lên / xuống
- **catch**: bắt kịp
- **shuttle**: xe/tàu đưa đón
- **conductor**: người soát vé

Mẫu câu:
- Which **line** goes to the city centre?
- We just **caught** the last bus.`,
          remember: "get on / get off dùng cho bus, train, plane; get in / get out dùng cho car.",
        },
      ],
      words: [
        w("fare", "/feə(r)/", "n", "giá vé", "the money you pay to travel", "Bus fares have gone up."),
        w("ticket office", "/ˈtɪkɪt ɒfɪs/", "n", "quầy bán vé", "a place where you buy tickets", "The ticket office closes at ten."),
        w("platform", "/ˈplætfɔːm/", "n", "sân ga", "the raised area beside a railway track", "The train to York leaves from platform four."),
        w("route", "/ruːt/", "n", "tuyến đường", "the way from one place to another", "This bus route goes past the university."),
        w("line", "/laɪn/", "n", "tuyến tàu xe", "a railway or bus route", "Take the green line to the museum."),
        w("stop", "/stɒp/", "n", "điểm dừng", "a place where a bus or train stops", "I got off at the next stop."),
        w("terminus", "/ˈtɜːmɪnəs/", "n", "bến cuối", "the last stop on a bus or train line", "The bus terminates at the town hall."),
        w("passenger", "/ˈpæsɪndʒə(r)/", "n", "hành khách", "a person travelling in a vehicle", "All passengers must wear a seat belt."),
        w("commuter", "/kəˈmjuːtə(r)/", "n", "người đi làm xa", "a person who travels to work regularly", "The station is full of commuters at eight."),
        w("board", "/bɔːd/", "v", "lên tàu, lên xe", "to get on a plane, train or ship", "Passengers may now board the train."),
        w("get on", "/ˌɡet ˈɒn/", "phr v", "lên xe, lên tàu", "to enter a bus, train or plane", "Get on the bus at the front."),
        w("get off", "/ˌɡet ˈɒf/", "phr v", "xuống xe, xuống tàu", "to leave a bus, train or plane", "We get off at the third stop."),
        w("catch", "/kætʃ/", "v", "bắt kịp, đón", "to be in time for a bus or train", "I ran to catch the last train."),
        w("single ticket", "/ˈsɪŋɡl tɪkɪt/", "n", "vé một lượt", "a ticket for one journey only", "A single ticket is cheaper than a return."),
        w("season ticket", "/ˈsiːzn tɪkɪt/", "n", "vé dài hạn", "a ticket for unlimited travel over a period", "He buys a monthly season ticket."),
        w("peak time", "/ˈpiːk taɪm/", "n", "giờ cao điểm", "the busiest time for travel", "Tickets cost more at peak time."),
        w("off-peak", "/ˌɒf ˈpiːk/", "adj", "giờ thấp điểm", "outside the busiest travel times", "I prefer to travel off-peak."),
        w("shuttle", "/ˈʃʌtl/", "n", "xe đưa đón", "a vehicle that travels regularly between two places", "A shuttle bus runs from the airport."),
        w("compartment", "/kəmˈpɑːtmənt/", "n", "khoang tàu", "a separate section inside a train", "We found seats in the quiet compartment."),
        w("conductor", "/kənˈdʌktə(r)/", "n", "người soát vé", "a person who checks tickets on a train or bus", "The conductor asked for our tickets."),
      ],
    },
  ],
};
