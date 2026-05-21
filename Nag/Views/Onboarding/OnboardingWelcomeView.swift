import SwiftUI

struct OnboardingWelcomeView: View {
    let onContinue: () -> Void

    var body: some View {
        VStack(spacing: 0) {
            Spacer()

            VStack(spacing: 28) {
                Image(systemName: "bell.badge.fill")
                    .font(.system(size: 72))
                    .foregroundStyle(.red)

                VStack(spacing: 12) {
                    Text("Meet Nag.")
                        .font(.largeTitle)
                        .fontWeight(.black)

                    Text("The app that refuses to let you\nignore that thing you've been putting off.")
                        .font(.title3)
                        .foregroundStyle(.secondary)
                        .multilineTextAlignment(.center)
                }

                Text("Your elbow. Your shoulder. Your back.\nNag will not shut up until you do something about it.")
                    .font(.body)
                    .foregroundStyle(.secondary)
                    .multilineTextAlignment(.center)
            }

            Spacer()
            Spacer()

            Button("Let's go") { onContinue() }
                .buttonStyle(.borderedProminent)
                .controlSize(.large)
                .padding(.bottom, 48)
        }
        .padding(.horizontal, 32)
    }
}
