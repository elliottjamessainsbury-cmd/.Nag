import SwiftUI

struct OnboardingNameView: View {
    @Binding var name: String
    let onContinue: () -> Void

    @FocusState private var isFocused: Bool
    private var trimmed: String { name.trimmingCharacters(in: .whitespacesAndNewlines) }

    var body: some View {
        VStack(spacing: 0) {
            Spacer()

            VStack(spacing: 32) {
                VStack(spacing: 12) {
                    Text("What should\nwe call you?")
                        .font(.largeTitle).fontWeight(.black)
                        .multilineTextAlignment(.center)

                    Text("We’ll use your name to make the nagging\nmore personal. And more annoying.")
                        .font(.body)
                        .foregroundStyle(.secondary)
                        .multilineTextAlignment(.center)
                }

                TextField("Your name", text: $name)
                    .font(.title2)
                    .multilineTextAlignment(.center)
                    .padding()
                    .background(Color(.secondarySystemBackground), in: RoundedRectangle(cornerRadius: 12))
                    .focused($isFocused)
                    .submitLabel(.continue)
                    .onSubmit { if !trimmed.isEmpty { onContinue() } }
            }
            .padding(.horizontal, 32)

            Spacer()
            Spacer()

            Button("Continue") { onContinue() }
                .buttonStyle(.borderedProminent)
                .controlSize(.large)
                .disabled(trimmed.isEmpty)
                .padding(.bottom, 48)
        }
        .onAppear { isFocused = true }
    }
}
