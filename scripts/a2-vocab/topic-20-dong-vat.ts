import { w } from "./helpers";
import type { SeedVocabTopic } from "../curriculum-data";

/** Chủ đề 20: Động vật & thiên nhiên. */
export const TOPIC_20: SeedVocabTopic = {
  name: "Động vật & thiên nhiên",
  slug: "dong-vat-thien-nhien",
  icon: "pets",
  description:
    "Từ vựng về động vật hoang dã, tập tính, thực vật, hệ sinh thái và công tác bảo tồn.",
  lessons: [
    {
      title: "Động vật hoang dã",
      summary:
        "20 từ/cụm từ về các nhóm động vật và những loài phổ biến trên cạn và dưới biển.",
      sections: [
        {
          title: "Phân loại động vật",
          body: `- **wildlife**: động vật hoang dã
- **mammal**: động vật có vú
- **reptile**: bò sát
- **insect**: côn trùng
- **amphibian**: động vật lưỡng cư
- **predator / prey**: động vật ăn thịt / con mồi
- **species**: loài

Mẫu câu:
- The park protects a wide range of **wildlife**.
- Whales are **mammals**, not fish.`,
          remember: "species có hình thức số ít và số nhiều giống nhau.",
        },
        {
          title: "Các loài quen thuộc",
          body: `- **elephant / tiger / lion**: voi / hổ / sư tử
- **monkey / bear / wolf / fox**: khỉ / gấu / sói / cáo
- **rabbit / deer**: thỏ / hươu
- **whale / dolphin / shark**: cá voi / cá heo / cá mập

Mẫu câu:
- We saw a **whale** from the boat.
- **Tigers** are becoming rarer in the wild.`,
          remember: "fish số nhiều thường vẫn là fish; fishes dùng khi chỉ nhiều loài.",
        },
      ],
      words: [
        w("wildlife", "/ˈwaɪldlaɪf/", "n", "động vật hoang dã", "animals and plants living in nature", "The island is famous for its wildlife."),
        w("mammal", "/ˈmæml/", "n", "động vật có vú", "a warm-blooded animal that feeds its young milk", "Dolphins are mammals."),
        w("reptile", "/ˈreptaɪl/", "n", "bò sát", "a cold-blooded animal such as a snake", "Snakes and lizards are reptiles."),
        w("insect", "/ˈɪnsekt/", "n", "côn trùng", "a small animal with six legs", "Bees are useful insects."),
        w("amphibian", "/æmˈfɪbiən/", "n", "động vật lưỡng cư", "an animal that lives on land and in water", "Frogs are amphibians."),
        w("predator", "/ˈpredətə(r)/", "n", "động vật ăn thịt", "an animal that hunts others", "The lion is a powerful predator."),
        w("prey", "/preɪ/", "n", "con mồi", "an animal hunted by another", "Rabbits are prey for foxes."),
        w("species", "/ˈspiːʃiːz/", "n", "loài", "a group of similar animals or plants", "Many species are at risk."),
        w("elephant", "/ˈelɪfənt/", "n", "con voi", "a very large grey animal with a long trunk", "The elephant drank from the river."),
        w("tiger", "/ˈtaɪɡə(r)/", "n", "con hổ", "a large wild cat with orange and black stripes", "Tigers hunt alone at night."),
        w("lion", "/ˈlaɪən/", "n", "sư tử", "a large wild cat that lives in groups", "The lion rested in the shade."),
        w("monkey", "/ˈmʌŋki/", "n", "con khỉ", "a small animal that climbs trees", "A monkey stole our bananas."),
        w("bear", "/beə(r)/", "n", "con gấu", "a large strong wild animal with thick fur", "We saw a bear near the river."),
        w("wolf", "/wʊlf/", "n", "con sói", "a wild animal that lives and hunts in groups", "Wolves howled in the distance."),
        w("fox", "/fɒks/", "n", "con cáo", "a wild animal with a pointed nose and bushy tail", "A fox crossed the garden at night."),
        w("rabbit", "/ˈræbɪt/", "n", "con thỏ", "a small animal with long ears", "The rabbit disappeared into a hole."),
        w("deer", "/dɪə(r)/", "n", "con hươu", "a wild animal with long legs and antlers", "A deer stood at the edge of the forest."),
        w("whale", "/weɪl/", "n", "cá voi", "a very large sea mammal", "We were lucky to see a whale."),
        w("dolphin", "/ˈdɒlfɪn/", "n", "cá heo", "an intelligent sea mammal", "Dolphins swam beside the boat."),
        w("shark", "/ʃɑːk/", "n", "cá mập", "a large sea fish with sharp teeth", "There have been shark sightings here."),
      ],
    },
    {
      title: "Cơ thể & tập tính",
      summary:
        "20 từ/cụm từ về bộ phận cơ thể động vật, môi trường sống và cách chúng sinh tồn.",
      sections: [
        {
          title: "Bộ phận cơ thể",
          body: `- **paw / claw**: bàn chân thú / móng vuốt
- **feather / fur**: lông vũ / lông thú
- **wing / tail / beak**: cánh / đuôi / mỏ chim
- **horn / scale / shell**: sừng / vảy / vỏ

Mẫu câu:
- The bird has bright blue **feathers**.
- The turtle pulled its head into its **shell**.`,
          remember: "feather dùng cho chim; fur dùng cho thú có lông mao.",
        },
        {
          title: "Môi trường sống và tập tính",
          body: `- **habitat / nest**: môi trường sống / tổ
- **burrow / den**: hang (thú nhỏ) / hang ổ
- **hibernate / hunt**: ngủ đông / săn
- **graze / breed**: gặm cỏ / sinh sản
- **offspring / herd**: con non / bầy đàn

Mẫu câu:
- Bears **hibernate** through the winter.
- The **herd** moved across the plain.`,
          remember: "offspring không đổi ở số nhiều.",
        },
      ],
      words: [
        w("paw", "/pɔː/", "n", "bàn chân thú", "an animal's foot", "The dog hurt its paw."),
        w("claw", "/klɔː/", "n", "móng vuốt", "a sharp curved nail on an animal", "The eagle caught the fish with its claws."),
        w("feather", "/ˈfeðə(r)/", "n", "lông vũ", "one of the light things covering a bird", "A white feather floated to the ground."),
        w("fur", "/fɜː(r)/", "n", "lông thú", "the soft thick hair of an animal", "The cat has thick grey fur."),
        w("wing", "/wɪŋ/", "n", "cánh", "the part of a bird or insect used for flying", "The bird broke its wing."),
        w("tail", "/teɪl/", "n", "đuôi", "the part at the back of an animal's body", "The dog wagged its tail."),
        w("beak", "/biːk/", "n", "mỏ chim", "the hard pointed mouth of a bird", "The bird used its beak to open the seed."),
        w("horn", "/hɔːn/", "n", "sừng", "a hard pointed growth on an animal's head", "The male deer has large horns."),
        w("scale", "/skeɪl/", "n", "vảy", "one of the small hard plates on a fish or reptile", "The snake's scales shone in the sun."),
        w("shell", "/ʃel/", "n", "vỏ", "the hard outer covering of an animal", "The crab hid inside its shell."),
        w("habitat", "/ˈhæbɪtæt/", "n", "môi trường sống", "the natural home of an animal or plant", "The wetland is an important habitat."),
        w("nest", "/nest/", "n", "tổ", "a home built by a bird", "There are eggs in the nest."),
        w("burrow", "/ˈbʌrəʊ/", "n", "hang (thú nhỏ)", "a hole dug by a small animal", "The rabbit ran into its burrow."),
        w("den", "/den/", "n", "hang ổ", "the home of a wild animal", "The fox sleeps in a den."),
        w("hibernate", "/ˈhaɪbəneɪt/", "v", "ngủ đông", "to sleep through the winter", "Hedgehogs hibernate in cold weather."),
        w("hunt", "/hʌnt/", "v", "săn", "to chase and kill animals for food", "Owls hunt at night."),
        w("graze", "/ɡreɪz/", "v", "gặm cỏ", "to eat grass in a field", "Sheep grazed on the hillside."),
        w("breed", "/briːd/", "v", "sinh sản", "to produce young animals", "These birds breed in spring."),
        w("offspring", "/ˈɒfsprɪŋ/", "n", "con non", "the young of an animal", "The programme protects the offspring of rare species."),
        w("herd", "/hɜːd/", "n", "bầy đàn", "a large group of animals", "A herd of elephants crossed the road."),
      ],
    },
    {
      title: "Thực vật & hệ sinh thái",
      summary:
        "20 từ/cụm từ về cây cối, các kiểu rừng, đại dương và hệ sinh thái tự nhiên.",
      sections: [
        {
          title: "Cấu tạo thực vật",
          body: `- **plant / root**: thực vật / rễ
- **branch / leaf / seed**: cành / lá / hạt
- **soil / weed**: đất / cỏ dại
- **bush / vine / moss**: bụi cây / dây leo / rêu

Mẫu câu:
- The **roots** of the tree are very deep.
- We pulled the **weeds** out of the garden.`,
          remember: "leaf số nhiều là leaves; seed là hạt giống.",
        },
        {
          title: "Hệ sinh thái và môi trường tự nhiên",
          body: `- **ecosystem / biodiversity**: hệ sinh thái / đa dạng sinh học
- **rainforest / jungle**: rừng mưa nhiệt đới / rừng nhiệt đới
- **coral reef / wetland**: rạn san hô / vùng đất ngập nước
- **desert / grassland**: sa mạc / đồng cỏ
- **ocean / swamp**: đại dương / đầm lầy

Mẫu câu:
- Coral reefs support incredible **biodiversity**.
- The **wetland** is home to many birds.`,
          remember: "jungle thường dùng cho rừng nhiệt đới rậm rạp.",
        },
      ],
      words: [
        w("plant", "/plɑːnt/", "n/v", "thực vật; trồng", "a living thing that grows in soil", "We planted a tree in the garden."),
        w("root", "/ruːt/", "n", "rễ", "the part of a plant under the ground", "The roots absorb water from the soil."),
        w("branch", "/brɑːntʃ/", "n", "cành", "a part of a tree that grows out from the trunk", "A bird sat on the branch."),
        w("leaf", "/liːf/", "n", "lá", "a flat green part of a plant", "The leaves turn red in autumn."),
        w("seed", "/siːd/", "n", "hạt", "the small part of a plant that can grow", "She planted a seed in a small pot."),
        w("soil", "/sɔɪl/", "n", "đất", "the earth in which plants grow", "The soil here is very rich."),
        w("weed", "/wiːd/", "n", "cỏ dại", "a wild plant growing where it is not wanted", "The garden was full of weeds."),
        w("bush", "/bʊʃ/", "n", "bụi cây", "a plant smaller than a tree", "There is a rose bush by the fence."),
        w("vine", "/vaɪn/", "n", "dây leo", "a climbing plant", "The vine covers the wall."),
        w("moss", "/mɒs/", "n", "rêu", "a small soft green plant that grows on wet surfaces", "Moss grows on the north side of the tree."),
        w("ecosystem", "/ˈiːkəʊsɪstəm/", "n", "hệ sinh thái", "a community of plants and animals", "The lake forms a fragile ecosystem."),
        w("biodiversity", "/ˌbaɪəʊdaɪˈvɜːsəti/", "n", "đa dạng sinh học", "the variety of living things in an area", "The forest has rich biodiversity."),
        w("rainforest", "/ˈreɪnfɒrɪst/", "n", "rừng mưa nhiệt đới", "a thick tropical forest with heavy rain", "The Amazon rainforest is under threat."),
        w("coral reef", "/ˈkɒrəl riːf/", "n", "rạn san hô", "a ridge of coral in the sea", "The coral reef attracts divers."),
        w("wetland", "/ˈwetlənd/", "n", "vùng đất ngập nước", "land that is often covered with water", "The wetland supports many rare birds."),
        w("desert", "/ˈdezət/", "n", "sa mạc", "a large dry area with little rain", "Few plants survive in the desert."),
        w("grassland", "/ˈɡrɑːslænd/", "n", "đồng cỏ", "a large area covered with grass", "Wild horses live on the grassland."),
        w("ocean", "/ˈəʊʃn/", "n", "đại dương", "a very large area of sea", "Plastic waste ends up in the ocean."),
        w("jungle", "/ˈdʒʌŋɡl/", "n", "rừng nhiệt đới", "a thick tropical forest", "They explored the jungle by boat."),
        w("swamp", "/swɒmp/", "n", "đầm lầy", "an area of soft wet land", "The swamp is full of insects."),
      ],
    },
    {
      title: "Bảo tồn & quan sát",
      summary:
        "20 từ/cụm từ về khu bảo tồn, quan sát động vật, nạn săn trộm và việc bảo vệ loài.",
      sections: [
        {
          title: "Nơi bảo tồn và quan sát",
          body: `- **sanctuary / national park**: khu bảo tồn / vườn quốc gia
- **zoo / aquarium**: sở thú / thủy cung
- **safari / observe**: chuyến đi săn ảnh / quan sát
- **trail / footprint**: dấu vết / dấu chân
- **wilderness**: vùng hoang dã

Mẫu câu:
- The **sanctuary** cares for injured animals.
- We went on a **safari** in Kenya.`,
          remember: "safari ban đầu nghĩa là chuyến đi quan sát động vật hoang dã.",
        },
        {
          title: "Bảo vệ loài",
          body: `- **extinct / extinction**: tuyệt chủng / sự tuyệt chủng
- **protect / protection**: bảo vệ / sự bảo vệ
- **poach / poacher**: săn trộm / kẻ săn trộm
- **rehabilitate / release**: phục hồi / thả về tự nhiên
- **volunteer / donation / awareness**: tình nguyện viên / quyên góp / nhận thức

Mẫu câu:
- Many species face **extinction**.
- The centre **releases** rescued animals into the wild.`,
          remember: "extinct là tính từ; extinction là danh từ.",
        },
      ],
      words: [
        w("sanctuary", "/ˈsæŋktʃuəri/", "n", "khu bảo tồn", "a safe area where animals are protected", "The elephant sanctuary rescues orphaned calves."),
        w("national park", "/ˌnæʃnəl ˈpɑːk/", "n", "vườn quốc gia", "a large area protected by the government", "We hiked in the national park."),
        w("zoo", "/zuː/", "n", "sở thú", "a place where wild animals are kept for display", "The children loved the zoo."),
        w("aquarium", "/əˈkweəriəm/", "n", "thủy cung", "a place where sea animals are kept", "The aquarium has a tunnel under the fish tank."),
        w("safari", "/səˈfɑːri/", "n", "chuyến đi săn ảnh", "a trip to watch wild animals", "We saw lions on safari."),
        w("observe", "/əbˈzɜːv/", "v", "quan sát", "to watch something carefully", "Scientists observe the birds from a hide."),
        w("trail", "/treɪl/", "n/v", "dấu vết; theo dấu", "marks left by an animal; to follow them", "We followed the trail through the forest."),
        w("footprint", "/ˈfʊtprɪnt/", "n", "dấu chân", "a mark left by a foot", "There was a large footprint in the mud."),
        w("wilderness", "/ˈwɪldənəs/", "n", "vùng hoang dã", "a wild area with no people", "They explored the wilderness for days."),
        w("extinct", "/ɪkˈstɪŋkt/", "adj", "tuyệt chủng", "no longer existing", "The dodo has been extinct for centuries."),
        w("extinction", "/ɪkˈstɪŋkʃn/", "n", "sự tuyệt chủng", "the disappearance of a species", "Hunting drove the species to extinction."),
        w("protect", "/prəˈtekt/", "v", "bảo vệ", "to keep something safe", "We must protect endangered animals."),
        w("protection", "/prəˈtekʃn/", "n", "sự bảo vệ", "the act of keeping something safe", "The law offers protection to rare species."),
        w("poach", "/pəʊtʃ/", "v", "săn trộm", "to hunt animals illegally", "Elephants are poached for their tusks."),
        w("poacher", "/ˈpəʊtʃə(r)/", "n", "kẻ săn trộm", "a person who hunts illegally", "The rangers caught the poacher."),
        w("rehabilitate", "/ˌriːəˈbɪlɪteɪt/", "v", "phục hồi", "to help an injured animal recover", "The centre rehabilitates injured birds."),
        w("release", "/rɪˈliːs/", "v", "thả về tự nhiên", "to set an animal free", "They released the turtle into the sea."),
        w("volunteer", "/ˌvɒlənˈtɪə(r)/", "n/v", "tình nguyện viên; tình nguyện", "a person who works without pay", "She works as a volunteer at the sanctuary."),
        w("donation", "/dəʊˈneɪʃn/", "n", "sự quyên góp", "money or goods given to help", "The charity relies on public donations."),
        w("awareness", "/əˈweənəs/", "n", "nhận thức", "knowledge about an issue", "The campaign raises awareness about wildlife crime."),
      ],
    },
  ],
};
