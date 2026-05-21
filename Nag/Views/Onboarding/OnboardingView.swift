import SwiftUI
import SwiftData

struct OnboardingView: View {
    let onComplete: () -> Void

    @Environment(\.modelContext) private var modelContext

    @State private var step = 0
    @State private var userName                = ""
    @State private var firstIssuePart: BodyPart? = nil
    @State private var firstIssueDescription   = ""
    @State private var frequency: NotificationFrequency = .medium
    @State private var tone: NotificationTone           = .sassy
    @State private var wakeUpTime: Date = OnboardingView.makeTime(hour: 7)
    @State private var sleepTime: Date  = OnboardingView.makeTime(hour: 22)

    var body: some View {
        ZStack {
            Color(.systemBackground).ignoresSafeArea()

            switch step {
            case 0:
                OnboardingWelcomeView { advance() }
            case 1:
                OnboardingDisclaimerView { advance() }
            case 2:
                OnboardingNameView(name: $userName) { advance() }
            case 3:
                OnboardingFirstIssueView(
                    selectedPart: $firstIssuePart,
                    description: $firstIssueDescription,
                    onContinue: { advance() }
                )
            case 4:
                OnboardingNotificationsView(
                    frequency: $frequency,
                    tone: $tone,
                    wakeUpTime: $wakeUpTime,
                    sleepTime: $sleepTime,
                    onContinue: { advance() }
                )
            case 5:
                OnboardingPermissionView { finish() }
            default:
                EmptyView()
            }
        }
        .id(step)
    }

    private func advance() {
        withAnimation(.easeInOut(duration: 0.3)) { step += 1 }
    }

    private func finish() {
        let settings = UserSettings()
        settings.userName               = userName.trimmingCharacters(in: .whitespacesAndNewlines)
        settings.notificationFrequency  = frequency
        settings.notificationTone       = tone
        settings.wakeUpTime             = wakeUpTime
        settings.sleepTime              = sleepTime
        settings.hasCompletedOnboarding = true
        modelContext.insert(settings)

        let trimmedDescription = firstIssueDescription.trimmingCharacters(in: .whitespacesAndNewlines)
        if let part = firstIssuePart, !trimmedDescription.isEmpty {
            modelContext.insert(Issue(bodyPart: part, specificIssue: trimmedDescription))
        }

        onComplete()
    }

    static func makeTime(hour: Int, minute: Int = 0) -> Date {
        var c = DateComponents()
        c.hour = hour; c.minute = minute
        return Calendar.current.date(from: c) ?? Date()
    }
}
