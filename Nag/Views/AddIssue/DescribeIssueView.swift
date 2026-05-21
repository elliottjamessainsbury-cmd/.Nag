import SwiftUI

struct DescribeIssueView: View {
    let bodyPart: BodyPart
    let onAdd: (String) -> Void

    @State private var description = ""
    @FocusState private var isFocused: Bool

    private let characterLimit = 150

    private var trimmed: String { description.trimmingCharacters(in: .whitespacesAndNewlines) }
    private var charsRemaining: Int { characterLimit - description.count }

    var body: some View {
        Form {
            // Selected body part shown as read-only context
            Section {
                HStack(spacing: 10) {
                    Circle()
                        .fill(Color.red)
                        .frame(width: 10, height: 10)
                    Text(bodyPart.displayName)
                        .fontWeight(.semibold)
                    Spacer()
                    Text("Tap back to change")
                        .font(.caption)
                        .foregroundStyle(.tertiary)
                }
            }

            Section {
                TextField("e.g. dry, cracked skin", text: $description, axis: .vertical)
                    .lineLimit(3...6)
                    .focused($isFocused)
                    .onChange(of: description) { _, new in
                        if new.count > characterLimit {
                            description = String(new.prefix(characterLimit))
                        }
                    }

                if charsRemaining <= 30 {
                    Text("\(charsRemaining) characters remaining")
                        .font(.caption2)
                        .foregroundStyle(charsRemaining <= 0 ? .red : .secondary)
                        .frame(maxWidth: .infinity, alignment: .trailing)
                }
            } header: {
                Text("Describe the issue")
            } footer: {
                Text("Be specific — this gets used in your notifications.")
            }

            Section {
                Label {
                    Text("For medical emergencies, call **999** or visit A&E immediately. Nag is for minor, fixable issues only — not for diagnosing symptoms.")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                } icon: {
                    Image(systemName: "exclamationmark.triangle.fill")
                        .foregroundStyle(.orange)
                }
            }
        }
        .navigationTitle("Describe it")
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                Button("Add") {
                    onAdd(trimmed)
                }
                .fontWeight(.semibold)
                .disabled(trimmed.isEmpty)
            }
        }
        .onAppear { isFocused = true }
    }
}
