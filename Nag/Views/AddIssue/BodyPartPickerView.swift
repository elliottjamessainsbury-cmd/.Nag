import SwiftUI

struct BodyPartPickerView: View {
    @Environment(\.dismiss) private var dismiss
    @State private var searchText = ""

    var body: some View {
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
        .navigationTitle("What's bothering you?")
        .navigationBarTitleDisplayMode(.large)
        .toolbar {
            ToolbarItem(placement: .topBarLeading) {
                Button("Cancel") { dismiss() }
            }
        }
    }

    private func filteredParts(for group: BodyPartGroup) -> [BodyPart] {
        BodyPart.allCases
            .filter { $0.group == group }
            .filter { searchText.isEmpty || $0.displayName.localizedCaseInsensitiveContains(searchText) }
    }
}
