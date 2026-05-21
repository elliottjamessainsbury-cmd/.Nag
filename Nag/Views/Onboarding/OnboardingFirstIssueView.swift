import SwiftUI

struct OnboardingFirstIssueView: View {
    @Binding var selectedPart: BodyPart?
    @Binding var description: String
    let onContinue: () -> Void

    @State private var path: [BodyPart] = []
    @State private var searchText = ""

    var body: some View {
        NavigationStack(path: $path) {
            List {
                ForEach(BodyPartGroup.allCases, id: \.self) { group in
                    let parts = filteredParts(for: group)
                    if !parts.isEmpty {
                        Section(group.rawValue) {
                            ForEach(parts) { part in
                                NavigationLink(value: part) {
                                    Text(part.displayName)
                                }
                            }
                        }
                    }
                }
            }
            .searchable(text: $searchText, prompt: "Search body parts")
            .navigationTitle("What’s bothering you?")
            .navigationBarTitleDisplayMode(.large)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button("Skip") { onContinue() }
                        .foregroundStyle(.secondary)
                }
            }
            .navigationDestination(for: BodyPart.self) { part in
                OnboardingDescribeStepView(bodyPart: part, description: $description) {
                    selectedPart = part
                    onContinue()
                }
            }
        }
    }

    private func filteredParts(for group: BodyPartGroup) -> [BodyPart] {
        BodyPart.allCases
            .filter { $0.group == group }
            .filter { searchText.isEmpty || $0.displayName.localizedCaseInsensitiveContains(searchText) }
    }
}

private struct OnboardingDescribeStepView: View {
    let bodyPart: BodyPart
    @Binding var description: String
    let onConfirm: () -> Void

    @FocusState private var isFocused: Bool
    private let characterLimit = 150
    private var trimmed: String { description.trimmingCharacters(in: .whitespacesAndNewlines) }

    var body: some View {
        Form {
            Section {
                HStack(spacing: 10) {
                    Circle().fill(Color.red).frame(width: 10, height: 10)
                    Text(bodyPart.displayName).fontWeight(.semibold)
                    Spacer()
                    Text("Tap ‹ to change").font(.caption).foregroundStyle(.tertiary)
                }
            }

            Section {
                TextField("e.g. dry, cracked skin", text: $description, axis: .vertical)
                    .lineLimit(3...6)
                    .focused($isFocused)
                    .onChange(of: description) { _, new in
                        if new.count > characterLimit { description = String(new.prefix(characterLimit)) }
                    }
                if description.count > characterLimit - 30 {
                    Text("\(characterLimit - description.count) remaining")
                        .font(.caption2)
                        .foregroundStyle(description.count >= characterLimit ? .red : .secondary)
                        .frame(maxWidth: .infinity, alignment: .trailing)
                }
            } header: {
                Text("Describe the issue")
            } footer: {
                Text("This gets used in your notifications, so be specific.")
            }
        }
        .navigationTitle("Describe it")
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                Button("Add & Continue") { onConfirm() }
                    .fontWeight(.semibold)
                    .disabled(trimmed.isEmpty)
            }
        }
        .onAppear { isFocused = true }
    }
}
