import SwiftUI

struct OnboardingDisclaimerView: View {
    let onContinue: () -> Void

    @State private var agreedToDisclaimer = false
    @State private var confirmedAge       = false

    var body: some View {
        VStack(spacing: 0) {
            ScrollView {
                VStack(alignment: .leading, spacing: 20) {
                    VStack(alignment: .leading, spacing: 8) {
                        Text("Before we start.")
                            .font(.largeTitle).fontWeight(.black)
                        Text("A few things you need to know.")
                            .foregroundStyle(.secondary)
                    }
                    .padding(.top, 8)

                    DisclaimerCard(
                        icon: "cross.case.fill", color: .red,
                        title: "Not medical advice",
                        body: "Nag is a reminder tool only. It does not diagnose, advise on, or treat any condition."
                    )
                    DisclaimerCard(
                        icon: "exclamationmark.triangle.fill", color: .orange,
                        title: "Minor issues only",
                        body: "This app is for small, annoying, fixable things — not for serious, acute, or rapidly worsening symptoms."
                    )
                    DisclaimerCard(
                        icon: "phone.fill", color: .green,
                        title: "Emergency?",
                        body: "Call 999 or go to A&E immediately. Do not use Nag to assess a medical emergency."
                    )
                }
                .padding(.horizontal)
            }

            VStack(spacing: 14) {
                Toggle(isOn: $agreedToDisclaimer) {
                    Text("I understand Nag is **not** medical advice")
                        .font(.subheadline)
                }
                Toggle(isOn: $confirmedAge) {
                    Text("I confirm I am **18 or older**")
                        .font(.subheadline)
                }
            }
            .padding(.horizontal)
            .padding(.top, 16)

            Button("I agree — let's go") { onContinue() }
                .buttonStyle(.borderedProminent)
                .controlSize(.large)
                .disabled(!agreedToDisclaimer || !confirmedAge)
                .padding(.horizontal)
                .padding(.vertical, 24)
        }
    }
}

private struct DisclaimerCard: View {
    let icon: String
    let color: Color
    let title: String
    let body: String

    var body: some View {
        HStack(alignment: .top, spacing: 14) {
            Image(systemName: icon)
                .font(.title2)
                .foregroundStyle(color)
                .frame(width: 32)
            VStack(alignment: .leading, spacing: 4) {
                Text(title).fontWeight(.semibold)
                Text(body)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
            }
        }
        .padding()
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Color(.secondarySystemBackground), in: RoundedRectangle(cornerRadius: 12))
    }
}
