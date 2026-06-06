import type { PresetComment } from "@/data/comments";

// 영어판 존엄사 댓글 풀 — 한국어판(comments.ts)과 id/likes/순서 1:1 대응.
// 같은 id = 같은 화자 페르소나·논지·어조 강도 (자극 등가성 검수용).
// ⚠️ 번역 초벌 — 연구팀 검수 필요 (논지 강도·레지스터가 한국어판과 동등한지,
//    영어권 커뮤니티에서 자연스러운지).

// =============================================================================
// CON (반대) — 존엄사 합법화 반대 의견
// =============================================================================

export const baseNegativeCommentsEn: PresetComment[] = [
  {
    id: "neg-base-1",
    author: "SanctityOfLife",
    content:
      "The fact that society would lend a hand in artificially ending a human life is dangerous in itself. You can dress it up as 'self-determination,' but in the end it's a system that legally assists suicide. Once we allow it there's no going back, which is exactly why we need to be more careful.",
    timeAgo: "32m ago",
    likes: 142,
    isAiGenerated: true,
  },
  {
    id: "neg-base-2",
    author: "MedSchoolPath",
    content:
      "From the first year of med school they drilled 'Do no harm' into us. Someone trained their whole life to save patients taking part in a patient's death contradicts the very essence of the profession. Among the clinicians I know, I've met almost no one who supports this.",
    timeAgo: "1h ago",
    likes: 88,
    isAiGenerated: true,
  },
  {
    id: "neg-base-3",
    author: "ThinkingOfMom",
    content:
      "My mom had terminal cancer. Her last three months were really hard. But what hurt her more than the pain was the guilt — 'my family is suffering because of me.' Watching that from beside her broke my heart.\n\nBut if death with dignity had been an option back then? She absolutely would have chosen it. Out of guilt toward us. Just thinking about that possibility makes me firmly against this. I'm forever grateful for the last days we spent together, and it terrifies me that we could have cut that time short :(",
    timeAgo: "2h ago",
    likes: 256,
    isAiGenerated: true,
  },
  {
    id: "neg-base-4",
    author: "EthicsStudent",
    content:
      "Look at the Netherlands. At first it was only for terminal patients, but now it covers depression, autism spectrum, even minors. The phrase 'slippery slope' didn't come out of nowhere. There's no guarantee whatsoever that we'd be any different.",
    timeAgo: "3h ago",
    likes: 97,
    isAiGenerated: true,
  },
  {
    id: "neg-base-5",
    author: "HospiceNurse8yrs",
    content:
      "I've worked in a hospice ward for 8 years. I see death every day, and at first I actually supported assisted dying. I'd think, 'is it right to make them endure this?'\n\nBut working here changed my mind. Modern palliative care can control most pain. What patients really struggle with isn't pain — it's loneliness, and the guilt of being a burden on their families. If we hand out the right to die without solving those things first, it's the poor and the lonely who will reach for that option first. Look up the data from Canada just once and you'll see what I mean. It's genuinely frightening.",
    timeAgo: "4h ago",
    likes: 312,
    isAiGenerated: true,
  },
  {
    id: "neg-base-6",
    author: "DisabilityRights",
    content:
      "Disability organizations don't oppose this for merely religious reasons. The very framing of a 'right to die with dignity' presupposes that there is such a thing as a life without dignity. Who gets to set that standard? In the end it sends a message to the most vulnerable: 'someone in your condition might as well stop living.'",
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
      "nah it's way too early for this lol. fix reimbursement rates and hospice infrastructure first, then we can talk",
    timeAgo: "12m ago",
    likes: 203,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-2",
    author: "LawMajor",
    content:
      "From a legal standpoint, the biggest problem is the authenticity of self-determination. Is a decision made under extreme pain and depression truly free will? In criminal law, intent formed in that state is considered 'defective intent.' And we want to end a life on that basis? It's an extremely dangerous legal logic.",
    timeAgo: "47m ago",
    likes: 71,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-3",
    author: "FriesAtMidnight",
    content:
      "My dad was given 6 months with pancreatic cancer 4 years ago. The whole family fell apart. But he miraculously recovered and still goes hiking today lol\n\nWhat if back then there'd been a death-with-dignity option and the mood had become 'wouldn't it be better for him to go comfortably'? Horrifying to even think about. Medicine keeps advancing and you really never know with the human body. There's a reason you don't give up till the end, for real.",
    timeAgo: "1h ago",
    likes: 187,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-4",
    author: "SocialWorker_J",
    content:
      "In the field I see so many people who effectively give up treatment because of the cost. A single round of non-covered chemo can be thousands of dollars. I'm scared legalization would become a system that nudges people toward deciding 'if I die, my family won't struggle.'",
    timeAgo: "2h ago",
    likes: 119,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-5",
    author: "CaringForParents",
    content:
      "As someone caring for my parents, this law passing would weigh on me so much :( It's so obvious they'd resolve 'I shouldn't be a burden'",
    timeAgo: "2h ago",
    likes: 96,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-6",
    author: "stage4_warrior",
    content:
      "I'm a terminal cancer patient myself. It's been 2 years since my stage 4 diagnosis.\n\nHonestly, at first all I thought about was wanting to die. Every day was unbearable and I felt so sorry toward my family. But over time my thinking changed. With pain management, the small things become precious. My grandkid saying 'grandma' for the first time, a bowl of porridge my husband made, a show we watched together. When I think I could have missed all of that, it's truly horrifying.\n\nTo patients like me, legalizing assisted dying sounds like a social signal that 'it's okay to stop living.' I'm begging you, please be more careful with this.",
    timeAgo: "3h ago",
    likes: 421,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-7",
    author: "PhilGradStudent",
    content:
      "I'd argue dignity isn't found in choosing your own death, but in building a society where you're cared for humanely until the very last moment. The name 'death with dignity' itself is a bit deceptive. Strictly speaking it's 'physician-assisted suicide' — the wording hides the substance.",
    timeAgo: "3h ago",
    likes: 82,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-8",
    author: "PreMed2ndYear",
    content:
      "The thing that stuck with me most in my first medical ethics class was 'primum non nocere.' A physician taking part in a patient's death inherently conflicts with the identity of the profession",
    timeAgo: "4h ago",
    likes: 64,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-9",
    author: "HistoryReader",
    content:
      "When Nazi Germany's euthanasia program (T4) first started, the justification was 'merciful death' too. It always starts with 'compassion.' We all know how it ended. History repeats itself.",
    timeAgo: "4h ago",
    likes: 105,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-10",
    author: "PsychiatristMD",
    content:
      "When patients in my practice say they want to die, 99% of the time what they mean is 'I want out of this suffering.' Not 'I genuinely want death itself.' Speaking responsibly as a psychiatrist: the answer is to address the cause of the suffering, not to end the life.",
    timeAgo: "5h ago",
    likes: 178,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-11",
    author: "Caregiver10yrs",
    content:
      "I've been a professional caregiver for elderly patients for 10 years, and honestly, far more of them want to live until the very end. The image of the 'patient who wants euthanasia' you see in the media is quite different from the field. They hold on saying things like 'just until my grandchild's wedding,' 'just one more cherry blossom season.'",
    timeAgo: "5h ago",
    likes: 92,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-12",
    author: "PharmStudent22",
    content:
      "A pharmacist's job is making medicine that saves people, not compounding drugs that kill them. If this gets legalized, the entire pharmacist code of ethics would have to be rewritten",
    timeAgo: "6h ago",
    likes: 53,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-13",
    author: "InsuranceActuary",
    content:
      "Honestly, speaking as someone in the insurance industry: if this is legalized, it's obvious how internal guidelines will change. Materials comparing 'cost of treatment vs. cost of assisted death' will get made soon enough. Capital always recommends the rational choice.",
    timeAgo: "6h ago",
    likes: 88,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-14",
    author: "anon_3492",
    content:
      "How do you take responsibility for misdiagnosis? I've seen someone given 6 months live another 10 years",
    timeAgo: "7h ago",
    likes: 134,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-15",
    author: "ClinicalPsych",
    content:
      "Multiple studies have confirmed that a large share of patients requesting assisted death have comorbid major depression. Accepting it as 'their own will' while leaving treatable depression unaddressed is dangerous. There's a reason much of the field argues a psychiatric evaluation must come first.",
    timeAgo: "7h ago",
    likes: 76,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-16",
    author: "LawPhDCandidate",
    content:
      "What the constitution guarantees is the right to life, not a right to die. Any push for legalization will struggle to avoid constitutional challenges",
    timeAgo: "8h ago",
    likes: 61,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-17",
    author: "NursingHomeAide",
    content:
      "Working in a nursing home, you see so many seniors whose families rarely visit. Loneliness is the worst disease. If the message 'assisted dying is legal' settles over society in that situation, those seniors get one step closer to deciding 'I suppose I can go now.' We should be expanding care, not expanding the exit.",
    timeAgo: "8h ago",
    likes: 144,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-18",
    author: "Pediatrician_K",
    content:
      "As a doctor who sees children, what worries me most is the message spreading across society that 'if it hurts enough, it's okay to die.' That impact shows up in the statistics.",
    timeAgo: "9h ago",
    likes: 79,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-19",
    author: "ElderCareCenter",
    content:
      "I work on elder abuse cases. Families pressuring parents over money and inheritance — there are far more of them than you'd think. If assisted dying is legalized, I genuinely worry about what will happen behind a single sheet of paper labeled 'the patient's own wish.' No review process can filter out the quiet pressure inside a family.",
    timeAgo: "10h ago",
    likes: 113,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-20",
    author: "InternistMD",
    content:
      "One more thing from a physician's perspective: this system shakes doctor–patient trust at its foundation. Once a terminal patient starts wondering 'is this doctor trying to save me or send me off,' meaningful care becomes impossible. There are actually reports from countries with these laws of elderly patients becoming afraid to go to the hospital.",
    timeAgo: "11h ago",
    likes: 95,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-21",
    author: "PalliativeResearch",
    content:
      "From a research standpoint: once a 'right to die' is institutionalized, the momentum for palliative care research and investment drains away. When a far cheaper exit exists, who's going to keep funding advances in pain management? In the end, the better care that future terminal patients could have received simply disappears.",
    timeAgo: "12h ago",
    likes: 68,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-22",
    author: "ExGovAdmin",
    content:
      "I don't buy the 'strict review board' promise. We all know how committee reviews turn into formalities. Once applications pile up, it'll inevitably become a rubber-stamp machine that approves anything meeting the paperwork requirements",
    timeAgo: "13h ago",
    likes: 87,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-23",
    author: "CareIsPublicDuty",
    content:
      "The order is backwards. Fix caregiver bankruptcy, solo family caregiving, and hospice waitlists first — the debate can wait until then. Opening the door to death before building a system where society takes responsibility for care isn't a choice, it's a push. Before the 'right to die with dignity,' shouldn't we guarantee the right to be sick with dignity?",
    timeAgo: "14h ago",
    likes: 156,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-24",
    author: "asdf_anon",
    content:
      "Stop dressing death up as a 'right.' Once that door opens, it never closes again",
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
      "Deciding how to end my own body, my own life, is the most basic form of self-determination. The strange thing is that the state can block even the right to choose death amid irreversible suffering. Legalization is an expansion of freedom, not a violation of it.",
    timeAgo: "29m ago",
    likes: 158,
    isAiGenerated: true,
  },
  {
    id: "pos-base-2",
    author: "FrontlineMD",
    content:
      "Internal medicine physician, 12 years in. I regularly stand by as patients with no chance of recovery spend days or weeks in excruciating pain. When medicine has nothing left to offer and the patient wants to decide their own ending, helping them do that is part of medical care too. 'Do no harm' does not mean forcing meaningless suffering.",
    timeAgo: "1h ago",
    likes: 124,
    isAiGenerated: true,
  },
  {
    id: "pos-base-3",
    author: "SaidGoodbyeToDad",
    content:
      "I lost my father last year. Stage 4 pancreatic cancer, and for the last two months he was barely conscious. Watching him moan when he occasionally woke up, even on the maximum morphine dose… I genuinely questioned whether that was a dignified ending for a human being.\n\nWhile he could still speak, he told us, 'don't drag this out.' But this country offers no such option, so we had no choice but to make him endure all of it. I still don't know if that was the right decision. People whose wishes are that clear should have a choice.",
    timeAgo: "2h ago",
    likes: 287,
    isAiGenerated: true,
  },
  {
    id: "pos-base-4",
    author: "ComparativeLaw",
    content:
      "The Netherlands, Belgium, Canada, Switzerland, Spain, and a dozen US states already have this in place. People love the 'slippery slope' argument, but the actual data shows it operating under strict review procedures — even the Netherlands, 20+ years in, has stabilized at around 4–5% of all deaths. We should look at real data, not vague fear.",
    timeAgo: "3h ago",
    likes: 109,
    isAiGenerated: true,
  },
  {
    id: "pos-base-5",
    author: "PalliativeResident",
    content:
      "Palliative care resident here. The claim that hospice controls most pain is only partly true. There are absolutely cases where pain can't be controlled, and even when it is, many patients face a long stretch of just lying there unconscious.\n\nWhen those patients say they want to say goodbye and leave while their mind is still clear, it weighs heavily on us as clinicians. Expanding palliative care and opening the option of assisted dying are not either/or — they need to happen together.",
    timeAgo: "4h ago",
    likes: 233,
    isAiGenerated: true,
  },
  {
    id: "pos-base-6",
    author: "HumanRightsLens",
    content:
      "Human rights include not just the 'right to be alive' but the whole 'right to live like a human being.' Is forcing someone to spend a few more days in extreme pain with no chance of recovery really protecting their rights? True dignity is preserved when people can decide the end of their own lives.",
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
      "honestly if the person themselves says they can't take it anymore, why does anyone else get to stop them? strict screening should be enough, no?",
    timeAgo: "14m ago",
    likes: 198,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-2",
    author: "LegalResearcher",
    content:
      "Courts have repeatedly affirmed self-determination as a core element of the constitutional right to pursue happiness. The view that deciding the timing of one's own death in an irreversible condition falls within that right is steadily gaining ground. Many scholars argue legalization aligns with the spirit of the constitution rather than violating it.",
    timeAgo: "50m ago",
    likes: 73,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-3",
    author: "WatchedGrandma",
    content:
      "My grandma was bedridden with ALS for 5 years. By the end she could only blink, and barely even that. While she could still speak she told us, so many times, 'I don't want to live like this.'\n\nBut there was no option here, so it was just… 5 years of that. The family broke down, and so did she. Sure, someone on the outside can say 'you should spend more time with family,' but that's the spectator's view — for the person, that time can be pure hell. We have to respect their own choice.",
    timeAgo: "1h ago",
    likes: 274,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-4",
    author: "SocialWorkField",
    content:
      "Speaking as someone who works in social services: the real blind spot is right now, while it's NOT legal. There are absolutely cases of people obtaining drugs underground, or family tragedies that follow. Bringing it into the system is what makes screening, evaluation, and mandatory psychiatric counseling possible — and lets us tie it to a social safety net so that nobody chooses it out of poverty.",
    timeAgo: "2h ago",
    likes: 142,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-5",
    author: "MothersLastWish",
    content:
      "Before she passed, my mother wrote in her own hand: 'no life support, remove the ventilator.' But it took forever for that to be legally processed, and in the meantime she lay there in exactly the state she never wanted. When someone's wishes are that clear and society still won't honor them — that felt like the crueler thing.",
    timeAgo: "2h ago",
    likes: 88,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-6",
    author: "als_patient",
    content:
      "I was diagnosed with ALS 3 years ago. These days I can move about two fingers and I'm writing this with a speech synthesizer.\n\nPeople around me keep saying 'don't give up,' 'you have to live till the end,' but honestly, what scares me most isn't dying — it's having to endure years of being fully conscious inside a body that can't move at all. When that time comes, I want to choose my own ending. Saying goodbye to my family and leaving while my mind is clear. That's what dignity means to me. I'd rather other people didn't make that decision for me.",
    timeAgo: "3h ago",
    likes: 412,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-7",
    author: "BioethicsResearch",
    content:
      "Bioethics has long debated the 'sanctity of life (SOL)' vs. 'quality of life (QOL)' paradigms. The broad trend in modern bioethics is toward weighting the patient's own values and autonomy. The one-size-fits-all approach of extending every life unconditionally is no longer the mainstream position in the field.",
    timeAgo: "3h ago",
    likes: 79,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-8",
    author: "MedStudent3rdYr",
    content:
      "In our medical ethics courses the single most emphasized principle was patient autonomy. The right to refuse treatment with clear intent is already recognized, and the right to decide the manner of one's death is increasingly discussed as its extension. 'Do no harm' was never meant to mandate meaningless life-prolongation.",
    timeAgo: "4h ago",
    likes: 67,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-9",
    author: "HistoryOtherView",
    content:
      "People keep bringing up Nazi T4, but that was state-driven killing completely detached from the person's own will. What's being discussed now is the exact opposite — a procedure that's only possible when the person explicitly requests it. Putting the two on the same line is closer to muddying the issue.",
    timeAgo: "4h ago",
    likes: 121,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-10",
    author: "Psychiatrist_J",
    content:
      "Let me add one thing as a psychiatrist: reducing every 'I want to die' to depression is, frankly, disrespectful to patients. When a decision has passed through physical irreversibility + clear intent + a sufficient reflection period + psychiatric evaluation, dismissing it as a 'pathological impulse' denies that person's rational will. The way forward is strengthening safeguards, not blocking the option itself.",
    timeAgo: "5h ago",
    likes: 187,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-11",
    author: "FamilyCaregiver",
    content:
      "I cared for my mother for 8 years. The last 2 she was barely conscious, with recurring bedsores and pneumonia. She wasn't living in that state — she was just being kept alive. Long before, she had said 'not like this,' and yet with no law, time simply passed that way. I'd ask people to think about which is actually crueler.",
    timeAgo: "5h ago",
    likes: 153,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-12",
    author: "PharmaResearcher",
    content:
      "I hold a pharmacist license. The purpose of pharmacy is the best outcome for the patient, not unconditional life extension. Palliative sedation — gradually increasing sedatives — is already a standard clinical practice, and the ethical distance between that and physician-assisted death is actually not that far.",
    timeAgo: "6h ago",
    likes: 58,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-13",
    author: "InsuranceInsider",
    content:
      "From inside the insurance industry: the current un-legalized situation is actually the bigger burden on families. Add up the cost of months in the ICU with no chance of recovery plus the family's psychological toll, and it's enormous. A system that forces life-prolongation people don't want is inefficient both economically and ethically.",
    timeAgo: "6h ago",
    likes: 84,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-14",
    author: "anon_5731",
    content:
      "Lots of people oppose this over misdiagnosis, but legalization is only being discussed under very narrow criteria like 'terminal/irreversible,' with multiple physician diagnoses + reflection periods + psychiatric evaluation all required. Doesn't seem like something to oppose based on vague hypotheticals",
    timeAgo: "7h ago",
    likes: 132,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-15",
    author: "ClinicalPsychPro",
    content:
      "A decision that has passed psychological evaluation and a decision made in a depressive state are clinically distinguishable. Treating every request to die as 'invalid because depression' ignores how far assessment techniques have come. Our job is to make the evaluation system more precise, not to keep the option locked away.",
    timeAgo: "7h ago",
    likes: 82,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-16",
    author: "LawPhD_K",
    content:
      "The constitutional courts of Germany and Canada have both recognized 'the freedom to decide one's own death amid irreversible suffering' as a constitutional right. There's every chance our constitution reaches the same conclusion. The growing majority view is that the unlegalized status quo, not legalization, is what's constitutionally untenable.",
    timeAgo: "8h ago",
    likes: 71,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-17",
    author: "VisitedSwitzerland",
    content:
      "I have relatives in Switzerland and saw this firsthand. At organizations like Dignitas, patients from other countries sometimes apply too — the family comes along, they say their goodbyes properly, and the person drinks the medication themselves while fully conscious and passes as if falling asleep. Watching patients have to travel that far and bear all that cost, it feels like we're far too late.",
    timeAgo: "9h ago",
    likes: 167,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-18",
    author: "LongTermCarer",
    content:
      "The truth is hospice beds are scarce and the cost means not everyone gets in. And even in hospice, some patients absolutely do face uncontrollable pain and delirium at the end. The premise that hospice is a cure-all just doesn't match the field. Separate from expanding hospice, there needs to be an option that respects the person's own wishes.",
    timeAgo: "10h ago",
    likes: 96,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-19",
    author: "SignedMyDirective",
    content:
      "I'm someone who signed an advance directive refusing life-sustaining treatment while perfectly healthy. I made that decision with the clearest mind I'll ever have, after plenty of deliberation. And yet when the moment actually comes, family consent and hospital policy apparently override my own wishes. That's the current system — even decisions made while fully competent aren't respected. Is institutionally guaranteeing a person's own will really such a dangerous thing?",
    timeAgo: "11h ago",
    likes: 102,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-20",
    author: "VetPerspective",
    content:
      "Veterinarian here. When a pet is suffering with no chance of recovery, we call euthanasia 'the last act of mercy' — and we call dragging it out cruel. It has always struck me as strange that for humans, that same mercy is forbidden. Of course there's a crucial difference: humans can confirm their own wishes. Which is exactly why it should be possible when a person clearly asks for it.",
    timeAgo: "12h ago",
    likes: 178,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-21",
    author: "DataWatcher",
    content:
      "Just look up the polls. Public support for legalizing assisted dying consistently runs around 70–80% in national surveys, and even among physicians more than half are in favor. What we have is a small, loud opposition drowning out a large, quiet majority. With this level of social consensus, there's no reason to keep postponing the debate.",
    timeAgo: "13h ago",
    likes: 145,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-22",
    author: "DadHadIPF",
    content:
      "To everyone saying pain can be managed with drugs — what about not being able to breathe? My father had end-stage pulmonary fibrosis, and in his last weeks he said every night felt like drowning. Morphine doesn't fully fix that. Once you've watched someone go through suffering that isn't just 'pain,' this whole debate looks different.",
    timeAgo: "14h ago",
    likes: 211,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-23",
    author: "FaithfulButFor",
    content:
      "I'm a churchgoer, so I wrestled with this for a long time. But I realized that believing life is a sacred gift and believing the state should forcibly prolong irreversible suffering are two different things. My faith is mine to keep — I don't have the right to write it into law and impose it on someone else's final moments. That's the conclusion I reached.",
    timeAgo: "15h ago",
    likes: 134,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-24",
    author: "anon_000",
    content:
      "Most of the people against this have never experienced that kind of suffering themselves. Easy to talk when it's not your life",
    timeAgo: "16h ago",
    likes: 167,
    isAiGenerated: true,
  },
];
