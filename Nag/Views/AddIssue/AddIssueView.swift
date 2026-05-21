import SwiftUI
import SwiftData

struct AddIssueView: View {
    @Environment(\.modelContext) private var modelContext
    @Environment(\.dismiss) private var dismiss

    @State private var path: [BodyPart] = []

    var body: some View {
        NavigationStack(path: $path) {
            BodyPartPickerView()
                .navigationDestination(for: BodyPart.self) { part in
                    DescribeIssueView(bodyPart: part) { description in
                        let issue = Issue(bodyPart: part, specificIssue: description)
                        modelContext.insert(issue)
                        dismiss()
                    }
                }
        }
    }
}
