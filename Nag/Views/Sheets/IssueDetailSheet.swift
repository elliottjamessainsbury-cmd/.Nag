import SwiftUI
import SwiftData

struct IssueDetailSheet: View {
    let issue: Issue
    let onResolve: () -> Void

    @Environment(\.modelContext) private var modelContext
    @Environment(\.dismiss) private var dismiss

    @State private var showSnoozeOptions       = false
    @State private var showDeleteConfirmation  = false
    @State private var editedDescription       = ""
    @State private var isEditing               = false

    var body: some View {
        NavigationStack {
            List {
                // MARK: Header
                Section {
                    HStack(alignment: .top, spacing: 12) {
                        Circle()
                            .fill(issue.status.color)
                            .frame(width: 12, height: 12)
                            .padding(.top, 4)

                        VStack(alignment: .leading, spacing: 4) {
                            Text(issue.bodyPart.displayName)
                                .font(.headline)

                            if isEditing {
                                TextField("Describe the issue", text: $editedDescription)
                                    .font(.subheadline)
                                    .foregroundStyle(.secondary)
                            } else {
                                Text(issue.specificIssue)
                                    .font(.subheadline)
                                    .foregroundStyle(.secondary)
                            }
                        }
                    }
                    .padding(.vertical, 4)

                    HStack(spacing: 16) {
                        Label("\(issue.daysActive) day\(issue.daysActive == 1 ? "" : "s")", systemImage: "calendar")
                        if issue.isSnoozed {
                            Label("Snoozed", systemImage: "moon.fill")
                                .foregroundStyle(.blue)
                        }
                    }
                    .font(.caption)
                    .foregroundStyle(.secondary)
                }

                // MARK: Status
                Section("Update status") {
                    ForEach(IssueStatus.allCases) { status in
                        StatusButton(status: status, isSelected: issue.status == status) {
                            handleStatusChange(to: status)
                        }
                    }
                }

                // MARK: Actions
                Section {
                    Button {
                        showSnoozeOptions = true
                    } label: {
                        Label(
                            issue.isSnoozed ? "Change snooze" : "Snooze notifications",
                            systemImage: "moon.fill"
                        )
                    }

                    Button(role: .destructive) {
                        showDeleteConfirmation = true
                    } label: {
                        Label("Delete issue", systemImage: "trash")
                    }
                }
            }
            .navigationTitle("Issue detail")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarLeading) {
                    if isEditing {
                        Button("Cancel") {
                            editedDescription = issue.specificIssue
                            isEditing = false
                        }
                    }
                }
                ToolbarItem(placement: .topBarTrailing) {
                    if isEditing {
                        Button("Save") {
                            issue.specificIssue = editedDescription
                            isEditing = false
                        }
                        .fontWeight(.semibold)
                    } else {
                        Menu {
                            Button { isEditing = true; editedDescription = issue.specificIssue } label: {
                                Label("Edit description", systemImage: "pencil")
                            }
                            Button("Done") { dismiss() }
                        } label: {
                            Image(systemName: "ellipsis.circle")
                        }
                    }
                }
            }
            .confirmationDialog("Snooze for…", isPresented: $showSnoozeOptions, titleVisibility: .visible) {
                ForEach(SnoozeDuration.allCases) { duration in
                    Button(duration.rawValue) { issue.snooze(for: duration) }
                }
                if issue.isSnoozed {
                    Button("Cancel snooze", role: .destructive) { issue.cancelSnooze() }
                }
                Button("Cancel", role: .cancel) {}
            }
            .confirmationDialog("Delete this issue?", isPresented: $showDeleteConfirmation, titleVisibility: .visible) {
                Button("Delete", role: .destructive) {
                    modelContext.delete(issue)
                    dismiss()
                }
                Button("Cancel", role: .cancel) {}
            } message: {
                Text("This removes the issue and stops all notifications for it.")
            }
        }
    }

    private func handleStatusChange(to status: IssueStatus) {
        issue.updateStatus(status)
        if status == .allFixed {
            dismiss()
            onResolve()
        }
    }
}

private struct StatusButton: View {
    let status: IssueStatus
    let isSelected: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            HStack {
                Circle()
                    .fill(status.color)
                    .frame(width: 11, height: 11)
                Text(status.rawValue)
                    .fontWeight(isSelected ? .semibold : .regular)
                Spacer()
                if isSelected {
                    Image(systemName: "checkmark")
                        .foregroundStyle(status.color)
                        .fontWeight(.semibold)
                }
            }
            .foregroundStyle(.primary)
        }
    }
}
