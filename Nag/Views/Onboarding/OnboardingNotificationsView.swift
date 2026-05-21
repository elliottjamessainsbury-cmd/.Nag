import SwiftUI

struct OnboardingNotificationsView: View {
    @Binding var frequency: NotificationFrequency
    @Binding var tone: NotificationTone
    @Binding var wakeUpTime: Date
    @Binding var sleepTime: Date
    let onContinue: () -> Void

    var body: some View {
        VStack(spacing: 0) {
            VStack(spacing: 8) {
                Text("Set up your nagging.")
                    .font(.largeTitle).fontWeight(.black)
                Text("You can change all of this later in Settings.")
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
            }
            .padding(.top, 24)
            .padding(.bottom, 8)

            Form {
                Section {
                    Picker("Frequency", selection: $frequency) {
                        ForEach(NotificationFrequency.allCases) { f in
                            Text(f.description).tag(f)
                        }
                    }
                    .pickerStyle(.segmented)
                    .listRowInsets(EdgeInsets(top: 10, leading: 0, bottom: 10, trailing: 0))
                    .listRowBackground(Color.clear)
                } header: {
                    Text("How often?")
                } footer: {
                    Text("Per day, spread equally across your active hours.")
                }

                Section("When are you awake?") {
                    DatePicker("Wake up", selection: $wakeUpTime, displayedComponents: .hourAndMinute)
                    DatePicker("Bedtime",  selection: $sleepTime,  displayedComponents: .hourAndMinute)
                }

                Section {
                    Picker("Tone", selection: $tone) {
                        ForEach(NotificationTone.allCases) { t in
                            Text(t.rawValue).tag(t)
                        }
                    }
                    .pickerStyle(.segmented)
                    .listRowInsets(EdgeInsets(top: 10, leading: 0, bottom: 10, trailing: 0))
                    .listRowBackground(Color.clear)

                    Text(tonePreview)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                        .italic()
                        .padding(.vertical, 4)
                } header: {
                    Text("Tone")
                } footer: {
                    Text(tone == .sassy ? "Cheeky and confrontational." : "Gentle and supportive.")
                }
            }

            Button("Continue") { onContinue() }
                .buttonStyle(.borderedProminent)
                .controlSize(.large)
                .padding(.horizontal)
                .padding(.vertical, 20)
        }
    }

    private var tonePreview: String {
        switch tone {
        case .sassy: return "“Come on. I’m getting bored of you putting this aside.”"
        case .calm:  return "“Have you checked in on that today? Just a gentle nudge.”"
        }
    }
}
