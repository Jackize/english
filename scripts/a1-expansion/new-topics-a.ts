import type { SeedVocabTopic } from "../curriculum-data";
import { lesson, w } from "./helpers";

export const NEW_TOPICS_A: SeedVocabTopic[] = [
  {
    name: "Ngoại hình & miêu tả người",
    slug: "ngoai-hinh-mieu-ta",
    icon: "face",
    description: "Miêu tả khuôn mặt, mái tóc, vóc dáng và phong cách của một người bằng các tính từ quen thuộc.",
    lessons: [
      lesson(
        "Khuôn mặt & mái tóc",
        "15 từ về các bộ phận trên khuôn mặt và kiểu tóc, kèm cách dùng have + tính từ.",
        "Từ vựng về khuôn mặt và mái tóc",
        `- **face**: khuôn mặt
- **hair**: mái tóc
- **forehead**: trán
- **eyebrow**: lông mày
- **cheek**: má (má bên)
- **chin**: cằm

Ví dụ: She has a round **face** and long **hair**. His **forehead** is quite high.`,
        "Dùng have/has + (tính từ) + bộ phận: She has curly hair.",
        [
          w("face", "/feɪs/", "n", "khuôn mặt", "the front part of your head", "She has a friendly face."),
          w("hair", "/heə/", "n", "mái tóc", "the thin threads that grow on your head", "My sister has long black hair."),
          w("forehead", "/ˈfɔːhed/", "n", "trán", "the part of the face above the eyes", "He put his hand on his forehead."),
          w("eyebrow", "/ˈaɪbraʊ/", "n", "lông mày", "the line of hair above your eye", "She has thin eyebrows."),
          w("cheek", "/tʃiːk/", "n", "má", "the soft part of the face below the eye", "The baby has red cheeks."),
          w("chin", "/tʃɪn/", "n", "cằm", "the part of the face below the mouth", "He has a small beard on his chin."),
          w("lip", "/lɪp/", "n", "môi", "one of the two soft edges of the mouth", "Her lips are dry."),
          w("curly", "/ˈkɜːli/", "adj", "xoăn", "having curves or curls", "He has curly brown hair."),
          w("straight", "/streɪt/", "adj", "thẳng", "not curved or wavy", "My hair is long and straight."),
          w("wavy", "/ˈweɪvi/", "adj", "gợn sóng", "having a gentle curve", "She has wavy hair."),
          w("blond", "/blɒnd/", "adj", "vàng hoe, vàng nhạt", "having light yellow hair", "The little boy has blond hair."),
          w("beard", "/bɪəd/", "n", "râu (cằm, má)", "hair that grows on a man's chin", "Her father has a grey beard."),
          w("moustache", "/məˈstɑːʃ/", "n", "ria mép", "hair that grows above the mouth", "The actor has a black moustache."),
          w("fringe", "/frɪndʒ/", "n", "tóc mái", "hair that hangs over the forehead", "She cut her fringe short."),
          w("bald", "/bɔːld/", "adj", "hói", "having little or no hair on the head", "My uncle is bald."),
        ],
      ),
      lesson(
        "Chiều cao & vóc dáng",
        "15 từ miêu tả chiều cao, cân nặng và thân hình của một người.",
        "Từ vựng về chiều cao và vóc dáng",
        `- **tall**: cao
- **short**: thấp, lùn
- **slim**: mảnh mai, thon
- **thin**: gầy, mỏng
- **fat**: béo
- **muscular**: cơ bắp, rắn chắc

Ví dụ: My brother is tall and **muscular**. She is **slim** but very **strong**.`,
        "Dùng to be + tính từ: He is tall. She is of medium height.",
        [
          w("tall", "/tɔːl/", "adj", "cao", "having a greater height than normal", "My father is very tall."),
          w("short", "/ʃɔːt/", "adj", "thấp, lùn", "having a small height", "He is shorter than his brother."),
          w("slim", "/slɪm/", "adj", "mảnh mai, thon", "thin in an attractive way", "She stays slim by running."),
          w("thin", "/θɪn/", "adj", "gầy, mỏng", "having little fat on the body", "He looked thin after his illness."),
          w("fat", "/fæt/", "adj", "béo", "having a lot of fat on the body", "The cat is getting fat."),
          w("overweight", "/ˌəʊvəˈweɪt/", "adj", "thừa cân", "heavier than is healthy", "He is a little overweight."),
          w("muscular", "/ˈmʌskjələ/", "adj", "cơ bắp, rắn chắc", "having strong muscles", "The boxer has a muscular body."),
          w("medium height", "/ˌmiːdiəm ˈhaɪt/", "phrase", "chiều cao trung bình", "neither tall nor short", "She is of medium height."),
          w("well-built", "/ˌwel ˈbɪlt/", "adj", "to khỏe, lực lưỡng", "having a strong, broad body", "The player is tall and well-built."),
          w("skinny", "/ˈskɪni/", "adj", "gầy nhom", "very thin, often in an unhealthy way", "The boy is too skinny."),
          w("broad-shouldered", "/ˌbrɔːd ˈʃəʊldəd/", "adj", "vai rộng", "having wide shoulders", "He is tall and broad-shouldered."),
          w("petite", "/pəˈtiːt/", "adj", "nhỏ nhắn", "small and thin, usually about a woman", "My mother is petite."),
          w("plump", "/plʌmp/", "adj", "tròn trịa, đầy đặn", "slightly fat in a pleasant way", "The baby has plump cheeks."),
          w("strong", "/strɒŋ/", "adj", "khỏe mạnh", "having a lot of physical power", "She is strong enough to lift the box."),
          w("weak", "/wiːk/", "adj", "yếu", "not physically strong", "He felt weak after the match."),
        ],
      ),
      lesson(
        "Đặc điểm nhận dạng",
        "15 từ về nét đặc trưng trên khuôn mặt và cách nhận xét ngoại hình của người khác.",
        "Từ vựng về đặc điểm nhận dạng",
        `- **glasses**: kính
- **freckles**: tàn nhang
- **scar**: vết sẹo
- **tattoo**: hình xăm
- **smile**: nụ cười, mỉm cười
- **pale**: nhợt nhạt, tái

Ví dụ: He wears **glasses** and has a small **scar** on his chin. She has a lovely **smile**.`,
        "wear glasses = đeo kính; have a scar/freckles/tattoo.",
        [
          w("glasses", "/ˈɡlɑːsɪz/", "n", "kính", "two lenses worn to help you see", "My teacher wears glasses."),
          w("freckles", "/ˈfreklz/", "n", "tàn nhang", "small brown spots on the skin", "The girl has freckles on her nose."),
          w("scar", "/skɑː/", "n", "vết sẹo", "a mark left on the skin after a cut", "He has a scar on his arm."),
          w("tattoo", "/təˈtuː/", "n", "hình xăm", "a picture drawn on the skin with ink", "She has a small tattoo on her wrist."),
          w("smile", "/smaɪl/", "n/v", "nụ cười; mỉm cười", "a happy expression on the face", "He gave me a big smile."),
          w("dimple", "/ˈdɪmpl/", "n", "lúm đồng tiền", "a small hollow in the cheek", "She has a dimple on her left cheek."),
          w("wrinkle", "/ˈrɪŋkl/", "n", "nếp nhăn", "a small line on the skin", "My grandmother has wrinkles around her eyes."),
          w("pale", "/peɪl/", "adj", "nhợt nhạt, tái", "having little colour in the face", "You look pale; are you ill?"),
          w("tanned", "/tænd/", "adj", "rám nắng", "having darker skin from the sun", "She came back from the beach tanned."),
          w("dark-skinned", "/ˌdɑːk ˈskɪnd/", "adj", "da ngăm, da sẫm", "having dark skin", "The dark-skinned man is our coach."),
          w("good-looking", "/ˌɡʊd ˈlʊkɪŋ/", "adj", "ưa nhìn, xinh trai", "attractive to look at", "Her brother is very good-looking."),
          w("handsome", "/ˈhænsəm/", "adj", "đẹp trai", "attractive, usually about a man", "The actor is tall and handsome."),
          w("beautiful", "/ˈbjuːtɪfl/", "adj", "xinh đẹp", "very attractive to look at", "She has beautiful eyes."),
          w("cute", "/kjuːt/", "adj", "dễ thương", "pretty or nice in a lovely way", "What a cute baby!"),
          w("ugly", "/ˈʌɡli/", "adj", "xấu xí", "not attractive to look at", "He thinks the old building is ugly."),
        ],
      ),
      lesson(
        "Cảm nhận & phong cách",
        "15 từ miêu tả phong cách ăn mặc, độ tuổi và sự giống hoặc khác nhau giữa hai người.",
        "Từ vựng về phong cách và độ tuổi",
        `- **stylish**: sành điệu
- **casual**: thoải mái, giản dị
- **neat**: gọn gàng
- **messy**: lộn xộn
- **young**: trẻ
- **old**: già, lớn tuổi

Ví dụ: He looks **stylish** in a black jacket. Her clothes are **casual** but **neat**.`,
        "look like + người/vật = trông giống; be similar to / be different from.",
        [
          w("stylish", "/ˈstaɪlɪʃ/", "adj", "sành điệu", "attractive and fashionable", "She wears stylish clothes."),
          w("casual", "/ˈkæʒuəl/", "adj", "thoải mái, giản dị", "relaxed and not formal", "He likes casual clothes at the weekend."),
          w("neat", "/niːt/", "adj", "gọn gàng", "clean and tidy", "Her hair is always neat."),
          w("messy", "/ˈmesi/", "adj", "lộn xộn, bừa bộn", "dirty or untidy", "His room is always messy."),
          w("smart", "/smɑːt/", "adj", "lịch sự, bảnh bao", "clean and well dressed", "You look smart in that suit."),
          w("sporty", "/ˈspɔːti/", "adj", "thể thao, năng động", "wearing or liking sports clothes", "She has a sporty style."),
          w("young", "/jʌŋ/", "adj", "trẻ", "having lived for only a short time", "My cousin is still young."),
          w("old", "/əʊld/", "adj", "già, lớn tuổi", "having lived for a long time", "The old man walks slowly."),
          w("middle-aged", "/ˌmɪdl ˈeɪdʒd/", "adj", "trung niên", "between young and old", "My parents are middle-aged."),
          w("teenager", "/ˈtiːneɪdʒə/", "n", "thanh thiếu niên", "a person between 13 and 19 years old", "The teenager is my neighbour."),
          w("adult", "/ˈædʌlt/", "n", "người lớn", "a person who is fully grown", "Tickets cost ten dollars for adults."),
          w("elderly", "/ˈeldəli/", "adj", "cao tuổi", "old, used politely", "An elderly woman sat next to me."),
          w("look like", "/lʊk laɪk/", "phrase", "trông giống", "to have a similar appearance to", "You look like your mother."),
          w("similar", "/ˈsɪmələ/", "adj", "giống nhau", "almost the same", "The two sisters look similar."),
          w("different", "/ˈdɪfrənt/", "adj", "khác nhau", "not the same", "Their hairstyles are different."),
        ],
      ),
    ],
  },
  {
    name: "Cảm xúc & tính cách",
    slug: "cam-xuc-tinh-cach-a1",
    icon: "mood",
    description: "Diễn tả cảm xúc vui buồn, lo lắng và nhận xét tính cách tích cực hoặc tiêu cực của con người.",
    lessons: [
      lesson(
        "Cảm xúc vui buồn",
        "15 tính từ diễn tả cảm xúc vui, buồn, lo lắng và tự hào trong các tình huống hằng ngày.",
        "Từ vựng về cảm xúc vui buồn",
        `- **happy**: vui, hạnh phúc
- **sad**: buồn
- **excited**: háo hức, phấn khích
- **bored**: chán
- **surprised**: ngạc nhiên
- **angry**: tức giận

Ví dụ: I am **happy** to see you. She felt **sad** after the film.`,
        "Dùng to be + tính từ cảm xúc: I'm happy. He is bored.",
        [
          w("happy", "/ˈhæpi/", "adj", "vui, hạnh phúc", "feeling pleased", "I am happy to see you."),
          w("sad", "/sæd/", "adj", "buồn", "feeling unhappy", "She felt sad after the film."),
          w("excited", "/ɪkˈsaɪtɪd/", "adj", "háo hức, phấn khích", "feeling very happy and interested", "The children are excited about the trip."),
          w("bored", "/bɔːd/", "adj", "chán", "feeling tired because nothing is interesting", "I was bored at home."),
          w("surprised", "/səˈpraɪzd/", "adj", "ngạc nhiên", "feeling that something is unexpected", "We were surprised by the news."),
          w("angry", "/ˈæŋɡri/", "adj", "tức giận", "feeling strong displeasure", "My father was angry about the noise."),
          w("upset", "/ʌpˈset/", "adj", "buồn lòng, bực bội", "unhappy or worried", "She was upset because she lost her keys."),
          w("lonely", "/ˈləʊnli/", "adj", "cô đơn", "sad because you are alone", "He feels lonely in a new city."),
          w("proud", "/praʊd/", "adj", "tự hào", "pleased about something good you did", "I am proud of my sister."),
          w("shy", "/ʃaɪ/", "adj", "nhút nhát", "nervous about meeting people", "The boy is too shy to speak."),
          w("scared", "/skeəd/", "adj", "sợ hãi", "afraid of something", "She is scared of dogs."),
          w("worried", "/ˈwʌrid/", "adj", "lo lắng", "unhappy because you think about problems", "My mother is worried about me."),
          w("calm", "/kɑːm/", "adj", "bình tĩnh", "not excited or worried", "Please stay calm."),
          w("nervous", "/ˈnɜːvəs/", "adj", "hồi hộp, lo lắng", "slightly worried before an event", "I am nervous before the exam."),
          w("glad", "/ɡlæd/", "adj", "vui mừng", "pleased about something", "I'm glad you came."),
        ],
      ),
      lesson(
        "Lo lắng & tức giận",
        "15 từ diễn tả sợ hãi, bực bội, thất vọng và các hành động thể hiện cảm xúc.",
        "Từ vựng về lo lắng và tức giận",
        `- **afraid**: sợ
- **frightened**: hoảng sợ
- **annoyed**: khó chịu
- **furious**: giận dữ
- **stressed**: căng thẳng
- **confused**: bối rối

Ví dụ: She was **frightened** by the loud noise. He felt **annoyed** with the slow service.`,
        "be afraid of + danh từ/V-ing; be stressed about + việc gì.",
        [
          w("afraid", "/əˈfreɪd/", "adj", "sợ", "feeling fear", "My little brother is afraid of the dark."),
          w("frightened", "/ˈfraɪtnd/", "adj", "hoảng sợ", "very afraid", "She was frightened by the loud noise."),
          w("annoyed", "/əˈnɔɪd/", "adj", "khó chịu, bực mình", "slightly angry", "He was annoyed with the slow service."),
          w("furious", "/ˈfjʊəriəs/", "adj", "giận dữ", "extremely angry", "My mother was furious about the mess."),
          w("stressed", "/strest/", "adj", "căng thẳng", "worried and under pressure", "I feel stressed before exams."),
          w("jealous", "/ˈdʒeləs/", "adj", "ghen tị", "unhappy because someone has something you want", "He is jealous of his brother's new bike."),
          w("confused", "/kənˈfjuːzd/", "adj", "bối rối", "not able to understand something", "I was confused by the question."),
          w("disappointed", "/ˌdɪsəˈpɔɪntɪd/", "adj", "thất vọng", "sad because something was not as good as hoped", "She was disappointed with her result."),
          w("embarrassed", "/ɪmˈbærəst/", "adj", "xấu hổ, ngượng", "shy and uncomfortable in front of others", "He felt embarrassed when he fell."),
          w("guilty", "/ˈɡɪlti/", "adj", "có lỗi, tội lỗi", "feeling that you did something wrong", "She felt guilty about the lie."),
          w("hurt", "/hɜːt/", "adj", "tổn thương", "feeling sad or injured", "His words made me feel hurt."),
          w("cry", "/kraɪ/", "v", "khóc", "to have tears coming from your eyes", "The baby began to cry."),
          w("laugh", "/lɑːf/", "v", "cười", "to make sounds showing you are happy", "We laughed at the funny story."),
          w("sigh", "/saɪ/", "v", "thở dài", "to breathe out slowly because you are tired or sad", "He sighed and closed the book."),
          w("frown", "/fraʊn/", "v", "cau mày", "to move your eyebrows down when angry or thinking", "She frowned at the difficult question."),
        ],
      ),
      lesson(
        "Tính cách tích cực",
        "15 tính từ khen ngợi tính cách tốt đẹp của một người trong cuộc sống hằng ngày.",
        "Từ vựng về tính cách tích cực",
        `- **kind**: tốt bụng
- **friendly**: thân thiện
- **funny**: hài hước
- **honest**: trung thực
- **brave**: dũng cảm
- **polite**: lịch sự

Ví dụ: Our teacher is **kind** and **patient**. He is **honest** about his mistakes.`,
        "Dùng to be + tính từ tính cách: She is friendly and helpful.",
        [
          w("kind", "/kaɪnd/", "adj", "tốt bụng", "friendly and caring", "My teacher is very kind."),
          w("friendly", "/ˈfrendli/", "adj", "thân thiện", "nice and pleasant to others", "The new student is friendly."),
          w("funny", "/ˈfʌni/", "adj", "hài hước", "making people laugh", "My uncle tells funny stories."),
          w("honest", "/ˈɒnɪst/", "adj", "trung thực", "always telling the truth", "He is honest about his mistakes."),
          w("brave", "/breɪv/", "adj", "dũng cảm", "not afraid of danger", "The brave boy saved the cat."),
          w("polite", "/pəˈlaɪt/", "adj", "lịch sự", "behaving in a respectful way", "She is always polite to guests."),
          w("helpful", "/ˈhelpfl/", "adj", "hay giúp đỡ", "willing to help people", "Our neighbours are very helpful."),
          w("cheerful", "/ˈtʃɪəfl/", "adj", "vui vẻ", "happy and positive", "She has a cheerful smile."),
          w("patient", "/ˈpeɪʃnt/", "adj", "kiên nhẫn", "able to wait calmly", "You must be patient with children."),
          w("generous", "/ˈdʒenərəs/", "adj", "hào phóng", "happy to give money or help", "He is generous with his time."),
          w("clever", "/ˈklevə/", "adj", "thông minh", "able to learn and understand quickly", "My sister is a clever student."),
          w("hard-working", "/ˌhɑːd ˈwɜːkɪŋ/", "adj", "chăm chỉ", "putting a lot of effort into work", "She is a hard-working nurse."),
          w("confident", "/ˈkɒnfɪdənt/", "adj", "tự tin", "sure about your abilities", "He looks confident on stage."),
          w("caring", "/ˈkeərɪŋ/", "adj", "chu đáo, biết quan tâm", "kind and looking after others", "She is a caring mother."),
          w("quiet", "/ˈkwaɪət/", "adj", "trầm tính, ít nói", "not talking very much", "My cousin is quiet but friendly."),
        ],
      ),
      lesson(
        "Tính cách tiêu cực",
        "15 tính từ miêu tả những nét tính cách chưa tốt, kèm cách góp ý nhẹ nhàng.",
        "Từ vựng về tính cách tiêu cực",
        `- **lazy**: lười biếng
- **rude**: thô lỗ
- **selfish**: ích kỷ
- **mean**: xấu tính, keo kiệt
- **silly**: ngớ ngẩn
- **serious**: nghiêm túc, nghiêm khắc

Ví dụ: It is **rude** to interrupt people. He is **lazy** in the morning.`,
        "Tránh nói 'You are lazy'; góp ý mềm hơn: You should try to be more hard-working.",
        [
          w("lazy", "/ˈleɪzi/", "adj", "lười biếng", "not wanting to work", "He is lazy in the morning."),
          w("rude", "/ruːd/", "adj", "thô lỗ", "not polite", "It is rude to interrupt people."),
          w("selfish", "/ˈselfɪʃ/", "adj", "ích kỷ", "only thinking about yourself", "Don't be so selfish with your toys."),
          w("mean", "/miːn/", "adj", "xấu tính, keo kiệt", "unkind or not generous", "That was a mean thing to say."),
          w("silly", "/ˈsɪli/", "adj", "ngớ ngẩn", "not sensible or serious", "It was a silly mistake."),
          w("serious", "/ˈsɪəriəs/", "adj", "nghiêm túc, nghiêm khắc", "not joking; thinking carefully", "Our head teacher is very serious."),
          w("strict", "/strɪkt/", "adj", "nghiêm khắc", "making people follow rules", "My parents are strict about bedtime."),
          w("noisy", "/ˈnɔɪzi/", "adj", "ồn ào", "making a lot of noise", "The classroom is noisy today."),
          w("careless", "/ˈkeələs/", "adj", "bất cẩn", "not taking enough care", "He made a careless mistake."),
          w("forgetful", "/fəˈɡetfl/", "adj", "hay quên", "often forgetting things", "My grandfather is a little forgetful."),
          w("impatient", "/ɪmˈpeɪʃnt/", "adj", "thiếu kiên nhẫn", "not able to wait calmly", "The driver was impatient in traffic."),
          w("stubborn", "/ˈstʌbən/", "adj", "bướng bỉnh, cứng đầu", "not willing to change your mind", "My little brother is very stubborn."),
          w("bossy", "/ˈbɒsi/", "adj", "hay sai khiến", "always telling other people what to do", "She is bossy with her friends."),
          w("naughty", "/ˈnɔːti/", "adj", "nghịch ngợm", "behaving badly, usually about a child", "The naughty boy hid my shoes."),
          w("unfriendly", "/ʌnˈfrendli/", "adj", "không thân thiện", "not kind or pleasant to others", "The shop assistant was unfriendly."),
        ],
      ),
    ],
  },
  {
    name: "Thể thao & trò chơi",
    slug: "the-thao-tro-choi",
    icon: "sports_soccer",
    description: "Gọi tên môn thể thao, dụng cụ, sân bãi và các trò chơi giải trí quen thuộc.",
    lessons: [
      lesson(
        "Môn thể thao",
        "15 tên môn thể thao phổ biến, kèm cách dùng play, go và do.",
        "Từ vựng về các môn thể thao",
        `- **basketball**: bóng rổ
- **volleyball**: bóng chuyền
- **tennis**: quần vợt
- **badminton**: cầu lông
- **baseball**: bóng chày
- **table tennis**: bóng bàn

Ví dụ: We play **basketball** after school. She plays **badminton** every Sunday.`,
        "play + môn bóng; go + V-ing (go running, go skiing); do + judo.",
        [
          w("basketball", "/ˈbɑːskɪtbɔːl/", "n", "bóng rổ", "a game where players throw a ball into a high net", "We play basketball after school."),
          w("volleyball", "/ˈvɒlibɔːl/", "n", "bóng chuyền", "a game where two teams hit a ball over a net", "The girls play volleyball on the beach."),
          w("tennis", "/ˈtenɪs/", "n", "quần vợt", "a game played with rackets and a small ball", "My father plays tennis every morning."),
          w("badminton", "/ˈbædmɪntən/", "n", "cầu lông", "a game played with rackets and a shuttlecock", "She plays badminton every Sunday."),
          w("baseball", "/ˈbeɪsbɔːl/", "n", "bóng chày", "a game played with a bat and a small ball", "Baseball is popular in Japan."),
          w("table tennis", "/ˈteɪbl ˌtenɪs/", "n", "bóng bàn", "a game played on a table with small bats", "We play table tennis in the gym."),
          w("running", "/ˈrʌnɪŋ/", "n", "chạy bộ", "the activity of running for exercise", "Running is good for your health."),
          w("judo", "/ˈdʒuːdəʊ/", "n", "võ judo", "a Japanese sport of fighting and throwing", "He does judo twice a week."),
          w("boxing", "/ˈbɒksɪŋ/", "n", "quyền anh", "a sport where two people fight with their hands", "My uncle watches boxing on TV."),
          w("golf", "/ɡɒlf/", "n", "gôn", "a game where you hit a small ball into holes", "He plays golf at the weekend."),
          w("rugby", "/ˈrʌɡbi/", "n", "bóng bầu dục", "a game played with an oval ball", "Rugby is a tough sport."),
          w("hockey", "/ˈhɒki/", "n", "khúc côn cầu", "a game played with sticks and a ball", "They play hockey on the school field."),
          w("skating", "/ˈskeɪtɪŋ/", "n", "trượt băng", "the activity of moving on ice skates", "We go skating in winter."),
          w("skiing", "/ˈskiːɪŋ/", "n", "trượt tuyết", "the sport of moving on skis", "Skiing is popular in the mountains."),
          w("surfing", "/ˈsɜːfɪŋ/", "n", "lướt sóng", "the sport of riding on waves", "He loves surfing in summer."),
        ],
      ),
      lesson(
        "Dụng cụ & sân bãi",
        "15 từ về dụng cụ thể thao, sân thi đấu và những người tham gia.",
        "Từ vựng về dụng cụ và sân bãi",
        `- **ball**: quả bóng
- **racket**: vợt
- **bat**: gậy đánh bóng
- **net**: lưới
- **goal**: khung thành, bàn thắng
- **whistle**: còi

Ví dụ: The player hit the **ball** over the **net**. The referee blew his **whistle**.`,
        "on the pitch/court/ground; in the gym/pool; on the track.",
        [
          w("ball", "/bɔːl/", "n", "quả bóng", "a round object used in games", "The boy kicked the ball."),
          w("racket", "/ˈrækɪt/", "n", "vợt", "a tool used to hit a ball in tennis", "I need a new tennis racket."),
          w("bat", "/bæt/", "n", "gậy đánh bóng", "a wooden stick used to hit a ball", "He held the bat with both hands."),
          w("net", "/net/", "n", "lưới", "material with holes used in sports", "The ball went over the net."),
          w("goal", "/ɡəʊl/", "n", "khung thành, bàn thắng", "the place where players score, or a point scored", "He scored the first goal."),
          w("whistle", "/ˈwɪsl/", "n", "còi", "a small object that makes a loud sound", "The referee blew his whistle."),
          w("helmet", "/ˈhelmɪt/", "n", "mũ bảo hiểm", "a hard hat that protects your head", "Wear a helmet when you ride a bike."),
          w("pitch", "/pɪtʃ/", "n", "sân bóng", "a field for football or rugby", "The players ran onto the pitch."),
          w("court", "/kɔːt/", "n", "sân quần vợt, sân bóng rổ", "an area for tennis or basketball", "They are playing on the tennis court."),
          w("ground", "/ɡraʊnd/", "n", "sân vận động, mặt sân", "an area used for sports", "The school ground is very large."),
          w("track", "/træk/", "n", "đường chạy", "a path for running or racing", "The athletes ran around the track."),
          w("gym", "/dʒɪm/", "n", "phòng tập thể dục", "a room with equipment for exercise", "I go to the gym after work."),
          w("pool", "/puːl/", "n", "bể bơi", "a place filled with water for swimming", "The hotel has a small pool."),
          w("team", "/tiːm/", "n", "đội", "a group of people playing together", "Our team has eleven players."),
          w("player", "/ˈpleɪə/", "n", "cầu thủ, người chơi", "a person who plays a sport or game", "He is the best player in the team."),
        ],
      ),
      lesson(
        "Trò chơi & giải trí",
        "15 từ về các trò chơi trong nhà, ngoài trời và đồ chơi trẻ em.",
        "Từ vựng về trò chơi và giải trí",
        `- **game**: trò chơi
- **chess**: cờ vua
- **puzzle**: câu đố, trò xếp hình
- **card**: quân bài, thẻ
- **board game**: trò chơi cờ bàn
- **video game**: trò chơi điện tử

Ví dụ: We played a **board game** after dinner. The children are playing **hide-and-seek**.`,
        "play a game / play chess / play cards; do a puzzle.",
        [
          w("game", "/ɡeɪm/", "n", "trò chơi", "an activity with rules that people play", "Let's play a game."),
          w("chess", "/tʃes/", "n", "cờ vua", "a board game for two players", "My grandfather taught me chess."),
          w("puzzle", "/ˈpʌzl/", "n", "câu đố, trò xếp hình", "a game or problem to solve", "She finished the puzzle in ten minutes."),
          w("card", "/kɑːd/", "n", "quân bài, thẻ", "a small piece of thick paper used in games", "We played cards on the train."),
          w("board game", "/ˈbɔːd ɡeɪm/", "n", "trò chơi cờ bàn", "a game played on a flat board", "This board game is fun for the family."),
          w("video game", "/ˈvɪdiəʊ ɡeɪm/", "n", "trò chơi điện tử", "a game played on a computer or console", "He plays video games after homework."),
          w("hide-and-seek", "/ˌhaɪd ən ˈsiːk/", "n", "trò trốn tìm", "a children's game of hiding and finding", "The children are playing hide-and-seek."),
          w("tag", "/tæɡ/", "n", "trò đuổi bắt", "a children's game where you chase others", "They played tag in the playground."),
          w("doll", "/dɒl/", "n", "búp bê", "a toy that looks like a person", "My niece carries her doll everywhere."),
          w("toy", "/tɔɪ/", "n", "đồ chơi", "an object for children to play with", "The baby has many colourful toys."),
          w("balloon", "/bəˈluːn/", "n", "quả bóng bay", "a rubber bag filled with air", "We decorated the room with balloons."),
          w("marble", "/ˈmɑːbl/", "n", "viên bi", "a small glass ball used in a game", "The boys played with marbles."),
          w("jigsaw", "/ˈdʒɪɡsɔː/", "n", "trò xếp hình", "a puzzle made of many pieces", "We completed a jigsaw together."),
          w("winner", "/ˈwɪnə/", "n", "người thắng cuộc", "the person who wins a game", "The winner got a small prize."),
          w("lose", "/luːz/", "v", "thua, mất", "to not win a game", "It is okay to lose sometimes."),
        ],
      ),
      lesson(
        "Thi đấu & kết quả",
        "15 từ về thi đấu, thắng thua và các phần thưởng trong thể thao.",
        "Từ vựng về thi đấu và kết quả",
        `- **compete**: thi đấu, cạnh tranh
- **competition**: cuộc thi
- **race**: cuộc đua
- **medal**: huy chương
- **trophy**: cúp
- **champion**: nhà vô địch

Ví dụ: Our team **won** the final match. She got a gold **medal** in the **race**.`,
        "win a match/prize; beat a team/player; draw a game = hòa.",
        [
          w("compete", "/kəmˈpiːt/", "v", "thi đấu, cạnh tranh", "to take part in a contest", "Ten teams will compete this year."),
          w("competition", "/ˌkɒmpəˈtɪʃn/", "n", "cuộc thi", "an event where people try to win", "She entered a singing competition."),
          w("race", "/reɪs/", "n", "cuộc đua", "a competition to see who is fastest", "He came first in the race."),
          w("medal", "/ˈmedl/", "n", "huy chương", "a metal prize for winning", "She won a gold medal."),
          w("trophy", "/ˈtrəʊfi/", "n", "cúp", "a cup given as a prize", "The captain lifted the trophy."),
          w("champion", "/ˈtʃæmpiən/", "n", "nhà vô địch", "the winner of a competition", "He is the world champion."),
          w("win", "/wɪn/", "v", "thắng", "to be first or best in a contest", "I hope we win the final match."),
          w("beat", "/biːt/", "v", "đánh bại", "to defeat someone in a game", "We beat them three to one."),
          w("draw", "/drɔː/", "n/v", "trận hòa; hòa", "a game with no winner", "The match ended in a draw."),
          w("point", "/pɔɪnt/", "n", "điểm", "a mark or unit in a game", "He scored twenty points."),
          w("final", "/ˈfaɪnl/", "n", "trận chung kết", "the last game in a competition", "They reached the final."),
          w("semi-final", "/ˌsemi ˈfaɪnl/", "n", "trận bán kết", "the game before the final", "We lost in the semi-final."),
          w("supporter", "/səˈpɔːtə/", "n", "cổ động viên", "a person who supports a team", "The supporters cheered loudly."),
          w("prize", "/praɪz/", "n", "giải thưởng", "something given to the winner", "The prize is a new bike."),
          w("record", "/ˈrekɔːd/", "n", "kỷ lục", "the best result ever achieved", "She broke the world record."),
        ],
      ),
    ],
  },
];
