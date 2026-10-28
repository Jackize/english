import type { ReadingUnit } from "../src/lib/reading-types";

// ---------------------------------------------------------------------------
// Nội dung Reading A1 dùng để seed vào Prisma.
// Nguồn nội dung: docs/curriculum/levels/a1/reading.md.
// ---------------------------------------------------------------------------

const a1Unit1: ReadingUnit = {
  level: "A1",
  slug: "unit-1",
  unitNumber: 1,
  unitTotal: 10,
  title: "Greetings & Introductions",
  passageTitle: "My First Day at English Class",
  goal: "Đọc hiểu đoạn giới thiệu bản thân; nhận biết tên, tuổi, quê quán, nghề nghiệp; làm quen dạng True/False và trắc nghiệm.",
  description:
    "Một bạn sinh viên kể về ngày đầu tiên ở lớp tiếng Anh: giáo viên, bạn học và bài tập về nhà.",
  lengthWords: 133,
  estimatedMinutes: 30,
  timeLabel: "25–35 phút",
  questionTypes: ["True/False", "Trắc nghiệm", "Matching", "Trả lời ngắn"],
  warmUp: [
    "Khi gặp một người mới, bạn thường nói gì bằng tiếng Anh? Viết 2 câu.",
    "Nhìn tiêu đề “My First Day at English Class”. Bạn nghĩ bài đọc sẽ nói về điều gì?",
    "Trong các từ sau, từ nào chỉ nghề nghiệp: teacher, student, cook, nurse, homework?",
    "Bạn thích học tiếng Anh vào buổi sáng hay buổi tối? Vì sao?",
  ],
  passage: [
    "Hello. My name is Linh. I am nineteen years old. I am from Da Nang, but I live in Ha Noi now. I am a student at a small English school.",
    'Today is my first day at the school. My teacher is Ms Hoa. She is very friendly. She says, "Good morning, everyone!" We say, "Good morning, Ms Hoa!"',
    "There are twelve students in my class. We sit in a circle. We say our names and our jobs. One student is Minh. He is a cook. Another student is Anna. She is from Australia. She is a nurse.",
    "At the end of the lesson, Ms Hoa gives us homework. We must write five sentences about ourselves. I like the class. I have a new friend. Her name is Anna. We walk home together.",
  ],
  groups: [
    {
      id: "true-false",
      badge: "A",
      label: "True or False",
      instructionVi: "Viết T (True) hoặc F (False) cho mỗi câu.",
      questions: [
        {
          id: "q1",
          number: 1,
          kind: "true-false",
          prompt: "Linh is from Ha Noi.",
          answer: "F",
          evidence: "I am from Da Nang, but I live in Ha Noi now.",
          explanation:
            "Bài đọc nói: “I am from Da Nang, but I live in Ha Noi now.” Quê của Linh là Đà Nẵng; Hà Nội là nơi cô ấy đang sống.",
        },
        {
          id: "q2",
          number: 2,
          kind: "true-false",
          prompt: "There are twelve students in Linh's class.",
          answer: "T",
          evidence: "There are twelve students in my class.",
          explanation: "Bài đọc nói: “There are twelve students in my class.”",
        },
      ],
    },
    {
      id: "multiple-choice",
      badge: "B",
      label: "Multiple choice",
      instructionVi: "Chọn đáp án đúng (A, B, C hoặc D).",
      questions: [
        {
          id: "q3",
          number: 3,
          kind: "mcq",
          prompt: "What is Ms Hoa like?",
          options: [
            { id: "a", label: "A", text: "quiet" },
            { id: "b", label: "B", text: "friendly" },
            { id: "c", label: "C", text: "strict" },
            { id: "d", label: "D", text: "tired" },
          ],
          answer: "b",
          evidence: "She is very friendly.",
          explanation:
            "Bài đọc nói: “She is very friendly.” Các đáp án còn lại không được nhắc đến.",
        },
      ],
    },
    {
      id: "matching",
      badge: "C",
      label: "Matching",
      instructionVi: "Nối mỗi tên ở cột trái với thông tin đúng ở cột phải.",
      questions: [
        {
          id: "q4",
          number: 4,
          kind: "matching",
          prompt: "Match 1–4 with a–d.",
          left: [
            { id: "minh", label: "1. Minh" },
            { id: "anna", label: "2. Anna" },
            { id: "ms-hoa", label: "3. Ms Hoa" },
            { id: "linh", label: "4. Linh" },
          ],
          right: [
            { id: "a", label: "a. a nurse from Australia" },
            { id: "b", label: "b. a cook" },
            { id: "c", label: "c. the teacher" },
            { id: "d", label: "d. walks home with Anna" },
          ],
          answer: { minh: "b", anna: "a", "ms-hoa": "c", linh: "d" },
          evidence:
            "He is a cook. · She is a nurse. · My teacher is Ms Hoa. · We walk home together.",
          explanation:
            "Minh là đầu bếp; Anna là y tá người Úc; Ms Hoa là giáo viên; Linh đi bộ về nhà cùng Anna.",
        },
      ],
    },
    {
      id: "short-answer",
      badge: "D",
      label: "Short answer",
      instructionVi: "Trả lời ngắn bằng tiếng Anh, dựa trực tiếp vào bài đọc.",
      questions: [
        {
          id: "q5",
          number: 5,
          kind: "short-answer",
          prompt: "What must the students write for homework?",
          acceptedAnswers: [
            "five sentences about themselves",
            "5 sentences about themselves",
            "five sentences",
            "5 sentences",
            "write five sentences about themselves",
            "write 5 sentences about themselves",
            "five sentences about themselves.",
            "5 sentences about themselves.",
          ],
          modelAnswer: "Five sentences about themselves.",
          evidence: "We must write five sentences about ourselves.",
          explanation:
            "Bài đọc nói: “We must write five sentences about ourselves.” Trả lời “five sentences” cũng được.",
        },
      ],
    },
  ],
  vocabulary: [
    {
      word: "friendly",
      ipa: "/ˈfrendli/",
      meaningVi: "thân thiện",
      example: "Our teacher is friendly.",
    },
    {
      word: "student",
      ipa: "/ˈstjuːdnt/",
      meaningVi: "học sinh, sinh viên",
      example: "I am a student.",
    },
    {
      word: "teacher",
      ipa: "/ˈtiːtʃə/",
      meaningVi: "giáo viên",
      example: "My teacher is Ms Hoa.",
    },
    {
      word: "homework",
      ipa: "/ˈhəʊmwɜːk/",
      meaningVi: "bài tập về nhà",
      example: "I do my homework after dinner.",
    },
    {
      word: "circle",
      ipa: "/ˈsɜːkl/",
      meaningVi: "vòng tròn",
      example: "We sit in a circle.",
    },
    {
      word: "cook",
      ipa: "/kʊk/",
      meaningVi: "đầu bếp",
      example: "My uncle is a cook.",
    },
    {
      word: "nurse",
      ipa: "/nɜːs/",
      meaningVi: "y tá",
      example: "She is a nurse at a small hospital.",
    },
    {
      word: "together",
      ipa: "/təˈɡeðə/",
      meaningVi: "cùng nhau",
      example: "We walk home together.",
    },
  ],
  skill: {
    title: "Skim 30 giây trước khi đọc kỹ",
    intro:
      "Đọc tiêu đề, câu đầu mỗi đoạn và các tên riêng (Linh, Hoa, Minh, Anna). Bạn chưa cần hiểu từng từ; chỉ cần biết bài nói về ai và ở đâu. Nhờ vậy, khi đọc câu hỏi bạn sẽ tìm thông tin nhanh hơn.",
    bullets: [
      "Đọc tiêu đề → đoán chủ đề.",
      "Đọc câu đầu tiên của mỗi đoạn.",
      "Khoanh tên riêng và số để quay lại nhanh.",
    ],
  },
  mistakes: [
    {
      title: "Nhầm from và live in",
      body: "From là quê quán, live in là nơi đang sống. Linh is from Da Nang nhưng sống ở Ha Noi.",
    },
    {
      title: "Chọn theo hiểu biết ngoài đời",
      body: "Ví dụ biết Đà Nẵng ở miền Trung rồi chọn đáp án không có trong bài. Luôn dựa vào bài đọc.",
    },
    {
      title: "Thấy một từ giống là chọn True",
      body: "Phải đọc cả câu: bài có thể nói “Anna is a nurse”, nhưng câu hỏi lại hỏi “Anna is a teacher”.",
    },
  ],
  source: "docs/curriculum/levels/a1/reading.md",
};

export const A1_READING_UNITS: ReadingUnit[] = [a1Unit1];
