import type { PresetComment } from "@/data/comments";

// 영어판 존엄사 댓글 풀 — 한국어판(comments.ts)과 id/likes/순서 1:1 대응.
// 같은 id = 같은 화자 페르소나·논지·논거 (자극 등가성 검수용).
// ⚠️ 말투(register)는 영어판만 의도적으로 레딧/커뮤니티 구어체로 조정됨 (구어체·축약어, 일반 대소문자).
//    또한 5개 윈도우마다 짧은 댓글 1개씩 섞어 길이 변화를 줌 (EN 전용).
//    KO와 어조 강도/길이 분포가 다르므로, 등가성 검수 시 '논지'는 동일·'레지스터'는 비동일로 볼 것.

// =============================================================================
// CON (반대) — 존엄사 합법화 반대 의견
// =============================================================================

export const baseNegativeCommentsEn: PresetComment[] = [
  {
    id: "neg-base-1",
    author: "SanctityOfLife",
    content:
      "The state actively helping end someone's life is dangerous on its own imo. You can call it 'self-determination' all you want but at the end of the day it's a system that legally assists suicide. And once that door's open there's no going back. That's exactly why we need to be way more careful here.",
    timeAgo: "32m ago",
    likes: 142,
    isAiGenerated: true,
  },
  {
    id: "neg-base-2",
    author: "MedSchoolPath",
    content:
      "From literally first year of med school they drill 'do no harm' into you. Someone who trained their whole life to save patients then taking part in a patient's death goes against the entire point of the job. And fwiw out of all the clinicians I know I've met almost nobody who actually supports this.",
    timeAgo: "1h ago",
    likes: 88,
    isAiGenerated: true,
  },
  {
    id: "neg-base-3",
    author: "ThinkingOfMom",
    content:
      "My mom had terminal cancer. Her last three months were really rough. But the thing that hurt her more than the pain was the guilt, like 'my family is suffering because of me.' Watching that from her bedside broke me.\n\nAnd honestly? If death with dignity had been an option back then she 100% would've taken it. Out of guilt toward us. Just thinking about that is why I'm firmly against this. I'm so grateful for those last days we had together and it scares me that we could've cut that time short :(",
    timeAgo: "2h ago",
    likes: 256,
    isAiGenerated: true,
  },
  {
    id: "neg-base-4",
    author: "EthicsStudent",
    content:
      "Look at the Netherlands. Started with terminal patients, now it covers depression and even minors. The 'slippery slope' isn't some hypothetical lol",
    timeAgo: "3h ago",
    likes: 97,
    isAiGenerated: true,
  },
  {
    id: "neg-base-5",
    author: "HospiceNurse8yrs",
    content:
      "Hospice nurse, 8 years in. I see death basically every day and honestly I used to support assisted dying. I'd think 'is it even right to make them go through this?'\n\nWorking here changed my mind though. Modern palliative care can control most of the pain. What patients actually struggle with isn't the pain, it's the loneliness and the guilt of feeling like a burden on their family. If you hand out the right to die without fixing those things first, it's the poor and the lonely who reach for it first. Go look up the Canada data even once and you'll see what I mean. It's genuinely scary.",
    timeAgo: "4h ago",
    likes: 312,
    isAiGenerated: true,
  },
  {
    id: "neg-base-6",
    author: "DisabilityRights",
    content:
      "Disability orgs don't oppose this for religious reasons, despite what people assume. The whole framing of a 'right to die with dignity' already assumes there's such a thing as a life *without* dignity. And who gets to decide that line? At the end of the day it sends a message to the most vulnerable people that 'someone in your condition might as well stop living.' That's the part that gets me.",
    timeAgo: "5h ago",
    likes: 134,
    isAiGenerated: true,
  },
];

export const additionalNegativeCommentsEn: PresetComment[] = [
  {
    id: "neg-ext-1",
    author: "anon_user",
    content:
      "Nah it's way too early for this lol. Fix reimbursement rates and hospice infrastructure first, then we can talk",
    timeAgo: "12m ago",
    likes: 203,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-2",
    author: "LawMajor",
    content:
      "Law student here so take it for what it's worth, but the biggest issue is whether the 'self-determination' is even real. Is a decision made under extreme pain and depression actually free will? In criminal law intent formed in that kind of state is treated as 'defective intent.' And we want to end a life based on that? That's really dangerous logic imo.",
    timeAgo: "47m ago",
    likes: 71,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-3",
    author: "FriesAtMidnight",
    content:
      "My dad got given 6 months with pancreatic cancer 4 years ago. Whole family fell apart. Then he just... miraculously recovered and still goes hiking today lol\n\nImagine if back then there'd been a death with dignity option and the mood shifted to 'wouldn't it be better for him to just go comfortably.' Genuinely horrifying to think about. Medicine keeps advancing and you really never know with the human body. There's a reason you don't give up till the very end, for real.",
    timeAgo: "1h ago",
    likes: 187,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-4",
    author: "SocialWorker_J",
    content:
      "Social worker here. In the field I see SO many people basically give up treatment because of cost. One round of non-covered chemo can run thousands of dollars. Honestly I'm scared legalization just turns into a system that quietly nudges people toward 'if I die my family won't struggle.'",
    timeAgo: "2h ago",
    likes: 119,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-5",
    author: "CaringForParents",
    content:
      "As someone caring for my parents, this law passing would weigh on me so bad :( It's so obvious they'd land on 'I shouldn't be a burden' and that's the whole problem",
    timeAgo: "2h ago",
    likes: 96,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-6",
    author: "stage4_warrior",
    content:
      "I'm a terminal cancer patient myself. Been 2 years since my stage 4 diagnosis.\n\nHonestly at first all I could think about was wanting to die. Every day was unbearable and I felt so guilty toward my family. But over time that changed. Once the pain was managed, the small things start to matter so much. My grandkid saying 'grandma' for the first time. A bowl of porridge my husband made. A show we watched together. When I think I could've missed all of that it genuinely scares me.\n\nFor patients like me, legalizing assisted dying sounds like society quietly saying 'it's ok to stop living.' I'm begging you all, please be more careful with this.",
    timeAgo: "3h ago",
    likes: 421,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-7",
    author: "PhilGradStudent",
    content:
      "I'd argue dignity isn't in choosing your own death, it's in building a society that cares for you humanely until the very last moment. Honestly the name 'death with dignity' is kind of a sleight of hand. Strictly speaking it's 'physician-assisted suicide,' the wording just hides what it actually is.",
    timeAgo: "3h ago",
    likes: 82,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-8",
    author: "PreMed2ndYear",
    content:
      "First thing they teach you in med ethics is 'do no harm.' A doctor helping a patient die clashes with the whole point of the job, full stop",
    timeAgo: "4h ago",
    likes: 64,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-9",
    author: "HistoryReader",
    content:
      "When Nazi Germany's euthanasia program (T4) first kicked off, the justification was 'merciful death' too. It always starts with 'compassion.' We all know how that one ended. History repeats itself.",
    timeAgo: "4h ago",
    likes: 105,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-10",
    author: "PsychiatristMD",
    content:
      "Psychiatrist here. When my patients say they want to die, 99% of the time what they actually mean is 'I want out of this suffering,' not 'I genuinely want to be dead.' And saying this responsibly: the answer is to treat the cause of the suffering, not to end the person.",
    timeAgo: "5h ago",
    likes: 178,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-11",
    author: "Caregiver10yrs",
    content:
      "Professional caregiver for elderly patients, 10 years. Honestly way more of them want to live till the very end than you'd think. The 'patient begging for euthanasia' image you see in the media is pretty different from the actual field. They hang on for stuff like 'just till my grandkid's wedding' or 'just one more spring.'",
    timeAgo: "5h ago",
    likes: 92,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-12",
    author: "PharmStudent22",
    content:
      "A pharmacist's whole job is making medicine that saves people, not mixing up drugs to kill them. If this gets legalized you'd basically have to rewrite the entire pharmacy code of ethics",
    timeAgo: "6h ago",
    likes: 53,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-13",
    author: "InsuranceActuary",
    content:
      "Honestly, as someone who works in insurance: if this gets legalized it's pretty obvious how the internal guidelines shift. Give it time and somebody's putting together a spreadsheet comparing 'cost of treatment vs cost of assisted death.' Capital always 'recommends' the rational choice.",
    timeAgo: "6h ago",
    likes: 88,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-14",
    author: "anon_3492",
    content:
      "And how do you take responsibility for a misdiagnosis? I've literally seen someone given 6 months live another 10 years",
    timeAgo: "7h ago",
    likes: 134,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-15",
    author: "ClinicalPsych",
    content:
      "Psych here. Tons of studies show a big chunk of people asking for assisted death also have untreated major depression. Calling that 'their own free will' while leaving something treatable untreated is exactly how this goes wrong. There's a reason a lot of us argue a psych eval has to come first.",
    timeAgo: "7h ago",
    likes: 76,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-16",
    author: "LawPhDCandidate",
    content:
      "The constitution guarantees a right to life, not a right to die. Good luck getting this past a constitutional challenge",
    timeAgo: "8h ago",
    likes: 61,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-17",
    author: "NursingHomeAide",
    content:
      "I work in a nursing home and you'd be shocked how many seniors barely get any family visits. Loneliness is the real disease here. If 'assisted dying is legal' becomes the background message of society while that's going on, those same seniors get one step closer to 'I guess I can go now.' We should be expanding care, not expanding the exit.",
    timeAgo: "8h ago",
    likes: 144,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-18",
    author: "Pediatrician_K",
    content:
      "Pediatrician here. The thing that worries me most is the message that spreads through society when this passes, basically 'if it hurts enough it's ok to die.' And that kind of thing does show up in the stats.",
    timeAgo: "9h ago",
    likes: 79,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-19",
    author: "ElderCareCenter",
    content:
      "I work on elder abuse cases. Families pressuring their parents over money and inheritance, there's way more of that than you'd ever think. If assisted dying gets legalized I genuinely worry about what happens behind one sheet of paper labeled 'the patient's own wish.' No review board can catch the quiet pressure happening inside a family.",
    timeAgo: "10h ago",
    likes: 113,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-20",
    author: "InternistMD",
    content:
      "One more thing as a physician: this whole thing shakes doctor-patient trust at the root. The second a terminal patient starts wondering 'is this doc trying to save me or push me out,' real care becomes impossible. There's actually reporting from countries with these laws about elderly patients getting scared to even go to the hospital.",
    timeAgo: "11h ago",
    likes: 95,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-21",
    author: "PalliativeResearch",
    content:
      "From the research side: once a 'right to die' gets institutionalized, the momentum (and funding) for palliative care research just drains away. When there's a way cheaper exit on the table, who's gonna keep paying for advances in pain management? The better care future patients could've gotten basically just disappears.",
    timeAgo: "12h ago",
    likes: 68,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-22",
    author: "ExGovAdmin",
    content:
      "I don't buy the 'strict review board' promise at all. We all know how committee reviews end up as a formality. Once the applications start piling up it's gonna turn into a rubber stamp that approves anything that checks the paperwork boxes",
    timeAgo: "13h ago",
    likes: 87,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-23",
    author: "CareIsPublicDuty",
    content:
      "The order is backwards. Fix caregiver bankruptcy, people caring for family solo, hospice waitlists first. The debate can wait till then. Opening the door to death before we've built a system where society actually takes responsibility for care isn't a 'choice,' it's a push. Before the 'right to die with dignity,' shouldn't we guarantee the right to be *sick* with dignity?",
    timeAgo: "14h ago",
    likes: 156,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-24",
    author: "asdf_anon",
    content:
      "Stop dressing death up as a 'right.' Once that door opens it never closes again",
    timeAgo: "15h ago",
    likes: 124,
    isAiGenerated: true,
  },
];

// =============================================================================
// PRO (찬성) — 존엄사 합법화 찬성 의견
// =============================================================================

export const basePositiveCommentsEn: PresetComment[] = [
  {
    id: "pos-base-1",
    author: "MyBodyMyChoice",
    content:
      "Deciding what happens to my own body, my own life, is like the most basic form of self-determination there is. What's actually weird is that the state gets to block even the choice to die when you're in irreversible suffering. Legalizing this is an expansion of freedom, not a violation of it.",
    timeAgo: "29m ago",
    likes: 158,
    isAiGenerated: true,
  },
  {
    id: "pos-base-2",
    author: "FrontlineMD",
    content:
      "Internal med doc, 12 years in. I regularly have to stand there while patients with zero chance of recovery spend days, sometimes weeks, in agony. When medicine has nothing left to give and the patient wants to decide their own ending, helping them do that IS part of care. 'Do no harm' was never about forcing people to suffer for no reason.",
    timeAgo: "1h ago",
    likes: 124,
    isAiGenerated: true,
  },
  {
    id: "pos-base-3",
    author: "SaidGoodbyeToDad",
    content:
      "Lost my father last year. Stage 4 pancreatic cancer, and the last two months he was barely conscious. Watching him moan the few times he woke up, even maxed out on morphine... I genuinely started questioning whether that was a dignified way for a person to go.\n\nWhile he could still talk he told us 'don't drag this out.' But there's no option for that here so we had no choice but to make him endure all of it. I still don't know if that was the right call. People whose wishes are that clear should at least get a choice.",
    timeAgo: "2h ago",
    likes: 287,
    isAiGenerated: true,
  },
  {
    id: "pos-base-4",
    author: "ComparativeLaw",
    content:
      "A dozen+ countries and US states already do this under strict review. Everyone screams 'slippery slope' but the actual data doesn't back it up. Look it up",
    timeAgo: "3h ago",
    likes: 109,
    isAiGenerated: true,
  },
  {
    id: "pos-base-5",
    author: "PalliativeResident",
    content:
      "Palliative care resident here. The 'hospice controls most pain' claim is only half true. There are absolutely cases where the pain can't be controlled, and even when it can, a lot of patients face a long stretch of just lying there unconscious.\n\nWhen those patients tell us they want to say goodbye and go while their mind is still clear, it weighs on us so much as clinicians. Expanding palliative care and opening up assisted dying aren't either/or, they need to happen together.",
    timeAgo: "4h ago",
    likes: 233,
    isAiGenerated: true,
  },
  {
    id: "pos-base-6",
    author: "HumanRightsLens",
    content:
      "Human rights aren't just the 'right to be alive,' they're the whole 'right to live like a human being.' Is forcing someone to spend a few more days in extreme pain with no chance of recovery actually protecting their rights? Real dignity is letting people decide the end of their own life imo.",
    timeAgo: "5h ago",
    likes: 116,
    isAiGenerated: true,
  },
];

export const additionalPositiveCommentsEn: PresetComment[] = [
  {
    id: "pos-ext-1",
    author: "anon_user",
    content:
      "Honestly if the person themselves says they can't take it anymore, why does anyone else get to stop them? Strict screening should be enough, no?",
    timeAgo: "14m ago",
    likes: 198,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-2",
    author: "LegalResearcher",
    content:
      "Courts have affirmed self-determination as a core part of the constitutional right to pursue happiness over and over. And the view that deciding the timing of your own death in an irreversible condition falls under that right keeps gaining ground. Plenty of scholars argue legalizing it actually lines up with the spirit of the constitution rather than violating it.",
    timeAgo: "50m ago",
    likes: 73,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-3",
    author: "WatchedGrandma",
    content:
      "My grandma was bedridden with ALS for 5 years. By the end she could only blink, and barely even that. While she could still talk she told us so many times, 'I don't want to live like this.'\n\nBut there's no option here so it was just... 5 years of that. The whole family broke down and so did she. Sure, someone on the outside can say 'you should cherish the time with family,' but that's the spectator talking. For the actual person that time can be pure hell. We have to respect their own choice.",
    timeAgo: "1h ago",
    likes: 274,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-4",
    author: "SocialWorkField",
    content:
      "As someone who works in social services: the real blind spot is right now, while it's NOT legal. There are absolutely people getting drugs underground, or family tragedies that come after. Bringing it into the system is what actually makes screening, evaluation and mandatory psych counseling possible, and lets us tie it to a safety net so nobody picks it out of poverty.",
    timeAgo: "2h ago",
    likes: 142,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-5",
    author: "MothersLastWish",
    content:
      "Before she passed my mom wrote it down in her own hand: 'no life support, take the ventilator out.' But it took forever for that to actually get processed legally, and the whole time she just lay there in exactly the state she never wanted. When someone's wishes are that clear and society still won't honor them... that's the part that felt crueler.",
    timeAgo: "2h ago",
    likes: 88,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-6",
    author: "als_patient",
    content:
      "I was diagnosed with ALS 3 years ago. These days I can move about two fingers and I'm typing this through a speech synthesizer.\n\nEveryone around me keeps saying 'don't give up,' 'you have to live till the end,' but honestly what scares me most isn't dying. It's having to spend years fully conscious trapped inside a body that can't move at all. When that time comes I want to choose my own ending. Say goodbye to my family and go while my mind is still clear. That's what dignity means to me. I'd really rather other people didn't make that call for me.",
    timeAgo: "3h ago",
    likes: 412,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-7",
    author: "BioethicsResearch",
    content:
      "Bioethics has been arguing 'sanctity of life (SOL)' vs 'quality of life (QOL)' forever. And the general direction the field has moved is toward weighting the patient's own values and autonomy. The one-size-fits-all 'extend every life no matter what' approach honestly isn't the mainstream position anymore.",
    timeAgo: "3h ago",
    likes: 79,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-8",
    author: "MedStudent3rdYr",
    content:
      "Med student here. Patient autonomy was the #1 thing drilled into us. 'Do no harm' was never about forcing pointless life-prolongation.",
    timeAgo: "4h ago",
    likes: 67,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-9",
    author: "HistoryOtherView",
    content:
      "People keep bringing up Nazi T4 but that was state-driven killing completely detached from the person's own will. What's being discussed now is the literal opposite, a process that only happens when the person explicitly asks for it. Putting those two in the same sentence is honestly just muddying the issue.",
    timeAgo: "4h ago",
    likes: 121,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-10",
    author: "Psychiatrist_J",
    content:
      "Let me add something as a psychiatrist: reducing every single 'I want to die' down to depression is honestly kind of disrespectful to patients. Once a decision has cleared physical irreversibility + clear intent + a real reflection period + a psych eval, writing it off as a 'pathological impulse' denies that person's rational will. The move is strengthening the safeguards, not blocking the option entirely.",
    timeAgo: "5h ago",
    likes: 187,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-11",
    author: "FamilyCaregiver",
    content:
      "I cared for my mother for 8 years. The last 2 she was barely conscious, bedsores and pneumonia coming back over and over. She wasn't living at that point, she was just being kept alive. Way before all that she'd said 'not like this,' and yet with no law in place time just... passed that way. Genuinely asking people to think about which one is actually crueler.",
    timeAgo: "5h ago",
    likes: 153,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-12",
    author: "PharmaResearcher",
    content:
      "I'm a licensed pharmacist. The point of pharmacy is the best outcome for the patient, not extending life no matter what. Palliative sedation, where you gradually up the sedatives, is already standard clinical practice, and honestly the ethical gap between that and physician-assisted death isn't as big as people think.",
    timeAgo: "6h ago",
    likes: 58,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-13",
    author: "InsuranceInsider",
    content:
      "From inside the insurance industry: the current NOT-legal situation is actually the bigger burden on families. Add up months in the ICU with no chance of recovery plus the psychological toll on the family and it's enormous. A system that forces life-prolongation nobody wanted is inefficient both economically and ethically.",
    timeAgo: "6h ago",
    likes: 84,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-14",
    author: "anon_5731",
    content:
      "Everyone brings up misdiagnosis but this only applies to terminal cases w multiple doctors + reflection periods + a psych eval. Hardly a loophole",
    timeAgo: "7h ago",
    likes: 132,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-15",
    author: "ClinicalPsychPro",
    content:
      "A decision that's cleared a psych evaluation and a decision made in a depressive state are clinically distinguishable, they're not the same thing. Treating every request to die as 'invalid bc depression' ignores how far assessment has actually come. Our job is to make the evaluation more precise, not to keep the whole option locked away.",
    timeAgo: "7h ago",
    likes: 82,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-16",
    author: "LawPhD_K",
    content:
      "The constitutional courts of both Germany and Canada have recognized 'the freedom to decide your own death amid irreversible suffering' as a constitutional right. There's every chance ours lands the same way. The growing majority view is that the un-legalized status quo, not legalization, is the part that's actually constitutionally untenable.",
    timeAgo: "8h ago",
    likes: 71,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-17",
    author: "VisitedSwitzerland",
    content:
      "I have relatives in Switzerland and saw this firsthand. At places like Dignitas, patients from other countries apply too. The family comes along, they actually get to say goodbye properly, and the person drinks the medication themselves fully conscious and goes as if falling asleep. Watching people have to travel that far and pay all that money for it, it feels like we're way too late on this.",
    timeAgo: "9h ago",
    likes: 167,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-18",
    author: "LongTermCarer",
    content:
      "Hospice beds are scarce and not everyone even gets one. And the 'hospice fixes everything' line just isn't true once you've seen the field.",
    timeAgo: "10h ago",
    likes: 96,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-19",
    author: "SignedMyDirective",
    content:
      "I signed an advance directive refusing life-sustaining treatment while perfectly healthy. Made that call with the clearest head I'll ever have, after a ton of thinking it through. And yet when the moment actually comes, family consent and hospital policy apparently override what *I* wanted. That's the current system, even decisions you made while fully competent don't get respected. Is institutionally guaranteeing a person's own will really that dangerous?",
    timeAgo: "11h ago",
    likes: 102,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-20",
    author: "VetPerspective",
    content:
      "Vet here. When a pet is suffering with no chance of recovery, we call euthanasia 'the last act of mercy,' and we call dragging it out cruel. It's always struck me as weird that for humans that same mercy is just forbidden. Obviously there's one key difference: humans can actually tell you their own wishes. Which is exactly why it should be allowed when a person clearly asks for it.",
    timeAgo: "12h ago",
    likes: 178,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-21",
    author: "DataWatcher",
    content:
      "Just look up the polls. Public support for legalizing assisted dying consistently sits around 70-80% in national surveys, and even among physicians more than half are in favor. What we've got here is a small loud opposition drowning out a big quiet majority. With this much social consensus there's no reason to keep stalling the debate.",
    timeAgo: "13h ago",
    likes: 145,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-22",
    author: "DadHadIPF",
    content:
      "To everyone saying pain can just be managed with drugs, ok but what about not being able to breathe? My dad had end-stage pulmonary fibrosis and in his last weeks he said every night felt like drowning. Morphine doesn't fully fix that. Once you've watched someone go through suffering that's not just 'pain,' this whole debate looks really different.",
    timeAgo: "14h ago",
    likes: 211,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-23",
    author: "FaithfulButFor",
    content:
      "I'm a churchgoer so I wrestled with this for a long time. But I realized that believing life is a sacred gift and believing the state should forcibly prolong irreversible suffering are two totally different things. My faith is mine to hold. I don't have the right to write it into law and force it onto someone else's final moments. That's where I landed.",
    timeAgo: "15h ago",
    likes: 134,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-24",
    author: "anon_000",
    content:
      "Most of the people against this have never been through that kind of suffering themselves. Easy to talk when it's not your life",
    timeAgo: "16h ago",
    likes: 167,
    isAiGenerated: true,
  },
];
