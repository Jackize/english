import { w } from "./helpers";
import type { SeedVocabTopic } from "../curriculum-data";

/** Chủ đề 13: Thể thao & giải trí. */
export const TOPIC_13: SeedVocabTopic = {
  name: "Thể thao & giải trí",
  slug: "the-thao-giai-tri",
  icon: "sports_soccer",
  description:
    "Từ vựng về môn thể thao, dụng cụ, thi đấu, giải thưởng và các chương trình giải trí.",
  lessons: [
    {
      title: "Các môn thể thao",
      summary:
        "20 từ/cụm từ về môn thể thao đồng đội, cá nhân và những hoạt động vận động ngoài trời.",
      sections: [
        {
          title: "Môn thể thao đồng đội",
          body: `- **basketball / volleyball**: bóng rổ / bóng chuyền
- **badminton / tennis / table tennis**: cầu lông / quần vợt / bóng bàn
- **baseball / rugby**: bóng chày / bóng bầu dục
- **hockey / golf**: khúc côn cầu / gôn

Mẫu câu:
- We play **badminton** every Wednesday.
- He is a big **rugby** fan.`,
          remember: "play + môn thể thao: play tennis, play football.",
        },
        {
          title: "Môn thể thao cá nhân",
          body: `- **athletics**: điền kinh
- **boxing / martial arts**: quyền anh / võ thuật
- **cycling / gymnastics**: đạp xe / thể dục dụng cụ
- **skiing / surfing / sailing**: trượt tuyết / lướt sóng / chèo thuyền
- **climbing / archery**: leo núi / bắn cung
- **marathon**: cuộc chạy marathon

Mẫu câu:
- She took up **climbing** last year.
- He finished his first **marathon**.`,
          remember: "do + môn cá nhân: do gymnastics, do archery; go + V-ing: go skiing.",
        },
      ],
      words: [
        w("athletics", "/æθˈletɪks/", "n", "điền kinh", "sports such as running and jumping", "She competes in athletics at school."),
        w("basketball", "/ˈbɑːskɪtbɔːl/", "n", "bóng rổ", "a game where players throw a ball into a basket", "We play basketball after class."),
        w("volleyball", "/ˈvɒlibɔːl/", "n", "bóng chuyền", "a game where teams hit a ball over a net", "The beach volleyball tournament starts today."),
        w("badminton", "/ˈbædmɪntən/", "n", "cầu lông", "a game played with rackets and a shuttlecock", "They play badminton in the park."),
        w("tennis", "/ˈtenɪs/", "n", "quần vợt", "a game where players hit a ball over a net", "He has a tennis lesson on Sundays."),
        w("table tennis", "/ˈteɪbl tenɪs/", "n", "bóng bàn", "a game played on a table with small bats", "We bought a table tennis set."),
        w("baseball", "/ˈbeɪsbɔːl/", "n", "bóng chày", "a game played with a bat and ball", "Baseball is very popular in Japan."),
        w("rugby", "/ˈrʌɡbi/", "n", "bóng bầu dục", "a team game played with an oval ball", "Rugby is a tough sport."),
        w("golf", "/ɡɒlf/", "n", "gôn", "a game where you hit a small ball into holes", "My boss plays golf at weekends."),
        w("hockey", "/ˈhɒki/", "n", "khúc côn cầu", "a team game played with sticks and a ball", "Field hockey is popular at our school."),
        w("boxing", "/ˈbɒksɪŋ/", "n", "quyền anh", "a sport in which two people fight with gloves", "He trains for boxing three times a week."),
        w("martial arts", "/ˌmɑːʃl ˈɑːts/", "n", "võ thuật", "sports such as karate and judo", "She has practised martial arts since childhood."),
        w("cycling", "/ˈsaɪklɪŋ/", "n", "đạp xe", "the sport of riding a bicycle", "Cycling is good for your legs."),
        w("gymnastics", "/dʒɪmˈnæstɪks/", "n", "thể dục dụng cụ", "a sport involving flexible body movements", "She started gymnastics at the age of five."),
        w("skiing", "/ˈskiːɪŋ/", "n", "trượt tuyết", "the sport of moving on skis", "We go skiing every winter."),
        w("surfing", "/ˈsɜːfɪŋ/", "n", "lướt sóng", "the sport of riding waves", "Surfing is popular on this coast."),
        w("sailing", "/ˈseɪlɪŋ/", "n", "chèo thuyền buồm", "the sport of travelling in a sailing boat", "He spent the summer sailing."),
        w("climbing", "/ˈklaɪmɪŋ/", "n", "leo núi", "the sport of going up mountains or rocks", "Climbing requires strength and skill."),
        w("archery", "/ˈɑːtʃəri/", "n", "bắn cung", "the sport of shooting arrows", "Archery is an ancient skill."),
        w("marathon", "/ˈmærəθən/", "n", "cuộc chạy marathon", "a running race of about 42 kilometres", "She completed the marathon in four hours."),
      ],
    },
    {
      title: "Dụng cụ & hành động",
      summary:
        "20 từ/cụm từ về sân bãi, dụng cụ, trọng tài và các động tác trong thể thao.",
      sections: [
        {
          title: "Sân bãi và dụng cụ",
          body: `- **ball / bat / racket**: bóng / gậy / vợt
- **net / goal**: lưới / khung thành
- **pitch / court**: sân bóng / sân quần vợt, bóng rổ
- **track / stadium**: đường chạy / sân vận động

Mẫu câu:
- The players warmed up on the **pitch**.
- We watched the race at the **stadium**.`,
          remember: "pitch dùng cho bóng đá, rugby; court dùng cho tennis, basketball.",
        },
        {
          title: "Thi đấu",
          body: `- **referee / player / captain**: trọng tài / cầu thủ / đội trưởng
- **match**: trận đấu
- **warm up / stretch**: khởi động / giãn cơ
- **tackle / kick**: tắc bóng / đá
- **shoot / head**: sút / đánh đầu
- **dribble**: rê bóng

Mẫu câu:
- The **referee** blew the whistle.
- The **captain** scored in the final minute.`,
          remember: "referee dùng cho bóng đá; umpire dùng cho tennis và cricket.",
        },
      ],
      words: [
        w("ball", "/bɔːl/", "n", "quả bóng", "a round object used in games", "The children kicked the ball."),
        w("bat", "/bæt/", "n", "gậy, vợt đánh bóng", "a piece of wood used to hit a ball", "He swung the bat and hit the ball."),
        w("racket", "/ˈrækɪt/", "n", "vợt", "a tool with strings used in tennis", "I need a new tennis racket."),
        w("net", "/net/", "n", "lưới", "material with holes used to stop a ball", "The ball went over the net."),
        w("goal", "/ɡəʊl/", "n", "khung thành, bàn thắng", "the frame where players score; a point scored", "He scored the winning goal."),
        w("pitch", "/pɪtʃ/", "n", "sân bóng", "an area for playing football or rugby", "The pitch was wet after the rain."),
        w("court", "/kɔːt/", "n", "sân thể thao", "an area for tennis or basketball", "They booked a tennis court."),
        w("track", "/træk/", "n", "đường chạy", "a path for running or racing", "The athletes ran around the track."),
        w("stadium", "/ˈsteɪdiəm/", "n", "sân vận động", "a large sports ground with seats", "The stadium holds sixty thousand people."),
        w("referee", "/ˌrefəˈriː/", "n", "trọng tài", "a person who controls a sports match", "The referee showed him a red card."),
        w("player", "/ˈpleɪə(r)/", "n", "cầu thủ, người chơi", "a person who plays a sport", "She is the best player on the team."),
        w("captain", "/ˈkæptɪn/", "n", "đội trưởng", "the leader of a sports team", "The captain spoke to the referee."),
        w("match", "/mætʃ/", "n", "trận đấu", "a sports game between two sides", "We watched the match on television."),
        w("warm up", "/ˌwɔːm ˈʌp/", "phr v", "khởi động", "to prepare your body for exercise", "Warm up before you start running."),
        w("stretch", "/stretʃ/", "v/n", "giãn cơ; động tác giãn cơ", "to extend your muscles", "Stretch your legs after the run."),
        w("tackle", "/ˈtækl/", "v/n", "tắc bóng; pha tắc bóng", "to try to take the ball from an opponent", "He tackled the player cleanly."),
        w("kick", "/kɪk/", "v/n", "đá; cú đá", "to hit something with your foot", "She kicked the ball into the goal."),
        w("shoot", "/ʃuːt/", "v", "sút", "to try to score by kicking or throwing", "He shot from outside the area."),
        w("volley", "/ˈvɒli/", "v/n", "đá bóng nửa nảy; cú đá nửa nảy", "to kick or hit a ball before it touches the ground", "She volleyed the ball into the net."),
        w("dribble", "/ˈdrɪbl/", "v", "rê bóng", "to move the ball forward with small touches", "He dribbled past two defenders."),
      ],
    },
    {
      title: "Thi đấu & giải thưởng",
      summary:
        "20 từ/cụm từ về giải đấu, huy chương, thắng thua, vòng chung kết và kỷ lục.",
      sections: [
        {
          title: "Giải đấu",
          body: `- **tournament**: giải đấu
- **championship**: chức vô địch, giải vô địch
- **league / cup**: giải vô địch quốc gia / cúp
- **final / semi-final**: chung kết / bán kết
- **qualify**: vượt qua vòng loại

Mẫu câu:
- Our team reached the **semi-final**.
- They **qualified** for the World Cup.`,
          remember: "qualify for a competition — giành quyền tham dự giải.",
        },
        {
          title: "Thắng thua và kỷ lục",
          body: `- **winner / loser**: người thắng / người thua
- **victory / defeat**: chiến thắng / thất bại
- **draw / tie**: trận hòa
- **medal / trophy**: huy chương / cúp
- **gold / silver / bronze**: vàng / bạc / đồng
- **record / athlete**: kỷ lục / vận động viên

Mẫu câu:
- She won a **gold medal**.
- The match ended in a **draw**.`,
          remember: "draw và tie đều là hòa; tie thường dùng trong Anh-Mỹ.",
        },
      ],
      words: [
        w("tournament", "/ˈtʊənəmənt/", "n", "giải đấu", "a competition with several matches", "The tennis tournament starts on Monday."),
        w("championship", "/ˈtʃæmpiənʃɪp/", "n", "giải vô địch", "a competition to find the best player or team", "They won the national championship."),
        w("league", "/liːɡ/", "n", "giải vô địch quốc gia", "a group of teams that play against each other", "Our team is top of the league."),
        w("cup", "/kʌp/", "n", "cúp", "a competition with a cup as the prize", "They lifted the cup after the final."),
        w("medal", "/ˈmedl/", "n", "huy chương", "a metal disc given as a prize", "She won a silver medal."),
        w("gold", "/ɡəʊld/", "n/adj", "vàng; bằng vàng", "a valuable yellow metal; the best medal", "He won gold in the swimming race."),
        w("silver", "/ˈsɪlvə(r)/", "n/adj", "bạc; bằng bạc", "a shiny grey metal; second-place medal", "The team took silver."),
        w("bronze", "/brɒnz/", "n/adj", "đồng; bằng đồng", "a brown metal; third-place medal", "She earned a bronze medal."),
        w("trophy", "/ˈtrəʊfi/", "n", "cúp, chiến lợi phẩm", "a prize given to the winner", "The trophy is on display at the club."),
        w("winner", "/ˈwɪnə(r)/", "n", "người thắng", "a person or team that wins", "The winner received a cash prize."),
        w("loser", "/ˈluːzə(r)/", "n", "người thua", "a person or team that loses", "The loser still played very well."),
        w("defeat", "/dɪˈfiːt/", "n/v", "thất bại; đánh bại", "the act of losing; to beat someone", "It was their first defeat of the season."),
        w("victory", "/ˈvɪktəri/", "n", "chiến thắng", "the act of winning", "The team celebrated their victory."),
        w("draw", "/drɔː/", "n/v", "trận hòa; hòa", "a result with equal scores", "The game ended in a draw."),
        w("tie", "/taɪ/", "n/v", "trận hòa; hòa", "an equal result", "The match was a tie."),
        w("final", "/ˈfaɪnl/", "n/adj", "trận chung kết; cuối cùng", "the last match in a competition", "They reached the final for the first time."),
        w("semi-final", "/ˌsemi ˈfaɪnl/", "n", "trận bán kết", "the match before the final", "We lost in the semi-final."),
        w("qualify", "/ˈkwɒlɪfaɪ/", "v", "vượt qua vòng loại", "to reach the next stage of a competition", "They qualified for the final."),
        w("record", "/ˈrekɔːd/", "n", "kỷ lục", "the best result ever achieved", "She broke the world record."),
        w("athlete", "/ˈæθliːt/", "n", "vận động viên", "a person who is good at sports", "The athletes trained for months."),
      ],
    },
    {
      title: "Giải trí & chương trình",
      summary:
        "20 từ/cụm từ về buổi biểu diễn, khán giả, phim ảnh, chương trình truyền hình và phụ đề.",
      sections: [
        {
          title: "Buổi biểu diễn",
          body: `- **entertainment**: giải trí
- **play**: vở kịch
- **audience / spectator**: khán giả (trong nhà hát) / khán giả (thể thao)
- **fan**: người hâm mộ
- **stage / row / seat**: sân khấu / hàng ghế / chỗ ngồi
- **event**: sự kiện

Mẫu câu:
- The **audience** clapped loudly.
- We had seats in the front **row**.`,
          remember: "audience xem biểu diễn; spectator xem thể thao.",
        },
        {
          title: "Phim và truyền hình",
          body: `- **screen / show**: màn hình / chương trình
- **series / episode**: loạt phim / tập phim
- **documentary / comedy**: phim tài liệu / hài kịch
- **drama / thriller**: phim chính kịch / phim giật gân
- **musical / cartoon**: nhạc kịch / phim hoạt hình
- **subtitle**: phụ đề

Mẫu câu:
- The **documentary** was about climate change.
- I watch English films with **subtitles**.`,
          remember: "subtitle là phụ đề; caption cũng là chú thích nhưng thường cho video ngắn.",
        },
      ],
      words: [
        w("entertainment", "/ˌentəˈteɪnmənt/", "n", "giải trí", "activities that amuse people", "The city offers plenty of entertainment."),
        w("event", "/ɪˈvent/", "n", "sự kiện", "something that happens, often planned", "The concert was a special event."),
        w("stage play", "/ˈsteɪdʒ pleɪ/", "n", "vở kịch sân khấu", "a story performed by actors in a theatre", "We saw a stage play at the local theatre."),
        w("audience", "/ˈɔːdiəns/", "n", "khán giả", "the people watching a performance", "The audience was completely silent."),
        w("spectator", "/spekˈteɪtə(r)/", "n", "khán giả thể thao", "a person who watches a sport", "Thousands of spectators filled the stadium."),
        w("supporter", "/səˈpɔːtə(r)/", "n", "người hâm mộ, cổ động viên", "a person who supports a team or performer", "Thousands of supporters filled the stadium."),
        w("seat", "/siːt/", "n", "chỗ ngồi", "a place to sit", "Our seats were near the stage."),
        w("row", "/rəʊ/", "n", "hàng ghế", "a line of seats", "We sat in the third row."),
        w("stage", "/steɪdʒ/", "n", "sân khấu", "the raised area where performers appear", "She walked onto the stage."),
        w("screen", "/skriːn/", "n", "màn hình", "the surface where a film is shown", "The screen was enormous."),
        w("show", "/ʃəʊ/", "n", "chương trình biểu diễn", "a performance or programme", "We watched a comedy show."),
        w("series", "/ˈsɪəriːz/", "n", "loạt phim", "a set of related television programmes", "The series has three seasons."),
        w("episode", "/ˈepɪsəʊd/", "n", "tập phim", "one part of a television series", "I missed the last episode."),
        w("documentary", "/ˌdɒkjuˈmentri/", "n", "phim tài liệu", "a film giving facts about a subject", "The documentary explored ocean life."),
        w("comedy", "/ˈkɒmədi/", "n", "hài kịch", "a funny film, play or programme", "We need a good comedy tonight."),
        w("drama", "/ˈdrɑːmə/", "n", "phim chính kịch", "a serious film or play", "The drama is based on a true story."),
        w("thriller", "/ˈθrɪlə(r)/", "n", "phim giật gân", "an exciting film about crime or danger", "I love watching thrillers."),
        w("musical", "/ˈmjuːzɪkl/", "n/adj", "nhạc kịch; thuộc âm nhạc", "a play or film with songs", "We saw a famous musical in London."),
        w("cartoon", "/kɑːˈtuːn/", "n", "phim hoạt hình", "a film made with drawings", "The children watch cartoons on Saturday."),
        w("subtitle", "/ˈsʌbtaɪtl/", "n", "phụ đề", "words shown at the bottom of a screen", "The film has English subtitles."),
      ],
    },
  ],
};
