import Foundation

// Provides randomised notification message strings for a given tone.
// Templates use {name}, {body_part}, and {days} as substitution tokens.
enum NotificationCopy {

    static func random(
        tone: NotificationTone,
        name: String,
        bodyPart: BodyPart,
        daysActive: Int
    ) -> String {
        let pool = tone == .sassy ? sassyTemplates : calmTemplates
        let template = pool.randomElement() ?? pool[0]
        return template
            .replacingOccurrences(of: "{name}",      with: name)
            .replacingOccurrences(of: "{body_part}", with: bodyPart.displayName.lowercased())
            .replacingOccurrences(of: "{days}",      with: "\(daysActive)")
    }

    // MARK: - Sassy templates

    private static let sassyTemplates: [String] = [
        "{name}, have you sorted that {body_part} yet? No? Thought so.",
        "Still ignoring that {body_part}, {name}? Bold strategy.",
        "Day {days}. {body_part}. Still there. Still waiting. Still your fault.",
        "YOU'RE AN ADULT, {name}. The {body_part} isn't going to fix itself.",
        "Friendly reminder that your {body_part} is still a problem. You're welcome.",
        "The {body_part} called. It's not happy with you, {name}.",
        "Imagine actually doing something about that {body_part}. Wild concept.",
        "Your {body_part} has been patient. You haven't.",
        "{name}. {body_part}. Get on with it.",
        "Another day, another excuse about that {body_part}.",
        "I'm not angry about the {body_part}, {name}. I'm just disappointed.",
        "Spoiler: the {body_part} is still there.",
        "The {body_part} doesn't care how busy you are, {name}.",
        "Still putting off that {body_part}? Respect the commitment to doing nothing.",
        "Your future self is going to have words with you about that {body_part}.",
        "Clock's ticking, {name}. The {body_part} isn't getting any younger.",
        "Have you at least Googled your {body_part}? No? Then call your GP.",
        "One day you'll think: I really should have sorted that {body_part} sooner. Today could be that day.",
        "{name}. The {body_part}. Remember? Still very much a thing.",
        "Other people sorted their {body_part}. Just saying.",
        "Plot twist: fixing the {body_part} is easier than being nagged about it forever.",
        "The {body_part}. Today. Come on.",
        "Not to alarm you, but that {body_part} has been logged for {days} days now.",
        "Hey {name}, quick question: what's your actual plan for that {body_part}?",
        "I believe in you, {name}. Not enough to stop nagging you about that {body_part}, but still.",
        "{name}. Seriously. The {body_part}. Today.",
        "Right. {body_part}. You. Now. Let's go.",
        "Genuinely curious, {name}: at what point does the {body_part} become a priority?",
        "The {body_part} isn't going to sort itself while you're reading this.",
        "You've had {days} days to deal with that {body_part}. What's the hold-up?",
    ]

    // MARK: - Calm templates

    private static let calmTemplates: [String] = [
        "{name}, have you checked in on your {body_part} today?",
        "A small step on that {body_part} today could prevent a bigger problem later.",
        "You'll feel so much better once you've dealt with that {body_part}. Time to act?",
        "Just a gentle nudge about your {body_part}, {name}.",
        "Taking care of your {body_part} is an act of self-care.",
        "Your {body_part} deserves a little attention today, {name}.",
        "One small action on that {body_part} is all it takes to get started.",
        "Have you had a chance to look into that {body_part} yet?",
        "It's a great day to make some progress on your {body_part}, {name}.",
        "Your wellbeing matters — including that {body_part}.",
        "A quick call to your GP about that {body_part} could make a real difference.",
        "You've got this, {name}. Even the {body_part} situation.",
        "Progress on your {body_part}, however small, is still progress.",
        "Just checking in — how's that {body_part} feeling today, {name}?",
        "The sooner you address that {body_part}, the sooner you can stop thinking about it.",
        "Be kind to yourself, {name}. That starts with looking after your {body_part}.",
        "Your {body_part} has been waiting patiently. A small step today?",
        "This is your friendly reminder that your {body_part} is worth a little attention.",
        "You're doing great, {name}. Now let's tackle that {body_part}.",
        "Sometimes all it takes is one phone call. Your {body_part} is worth that.",
        "Life's better when your {body_part} isn't bothering you. Let's get there.",
        "What would it take to make some progress on that {body_part} today, {name}?",
        "A healthier you starts with small steps — like doing something about that {body_part}.",
        "You've handled harder things than this, {name}. That {body_part} doesn't stand a chance.",
        "Imagine how good it'll feel when that {body_part} is sorted. That day can be soon.",
        "Don't let that {body_part} become a bigger issue. You have time to act now.",
        "Your {body_part} has been on your mind for a reason. Let that be a nudge to act.",
        "One step at a time, {name}. Today, that step is your {body_part}.",
        "Checking in on that {body_part} — even just for two minutes — is worth it.",
        "Small actions add up, {name}. Your {body_part} will thank you.",
    ]
}
