import SwiftUI
import UserNotifications

struct OnboardingPermissionView: View {
    let onComplete: () -> Void

    @State private var isRequesting = false

    var body: some View {
        VStack(spacing: 0) {
            Spacer()

            VStack(spacing: 28) {
                Image(systemName: "bell.badge.fill")
                    .font(.system(size: 72))
                    .foregroundStyle(.red)

                VStack(spacing: 12) {
                    Text("One last thing.")
                        .font(.largeTitle).fontWeight(.black)

                    Text("Nag needs permission to send you notifications.\nOtherwise it’s just… a list.")
                        .font(.body)
                        .foregroundStyle(.secondary)
                        .multilineTextAlignment(.center)
                }
            }

            Spacer()
            Spacer()

            VStack(spacing: 16) {
                Button("Allow notifications") { requestPermission() }
                    .buttonStyle(.borderedProminent)
                    .controlSize(.large)
                    .disabled(isRequesting)

                Button("Skip for now") { onComplete() }
                    .foregroundStyle(.secondary)
                    .font(.subheadline)
            }
            .padding(.bottom, 48)
        }
        .padding(.horizontal, 32)
    }

    private func requestPermission() {
        isRequesting = true
        Task {
            _ = try? await UNUserNotificationCenter.current()
                .requestAuthorization(options: [.alert, .badge, .sound])
            await MainActor.run { onComplete() }
        }
    }
}
