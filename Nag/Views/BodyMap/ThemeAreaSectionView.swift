import SwiftUI

struct ThemeAreaSectionView: View {
    let issues: [Issue]
    let onSelectIssue: (Issue) -> Void

    private var unpinnedIssues: [Issue] {
        issues.filter { !$0.bodyPart.isPinnedToBody }
    }

    var body: some View {
        if !unpinnedIssues.isEmpty {
            VStack(alignment: .leading, spacing: 0) {
                Text("Other areas")
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .padding(.horizontal)
                    .padding(.bottom, 6)

                ForEach(unpinnedIssues) { issue in
                    ThemeAreaRow(issue: issue)
                        .contentShape(Rectangle())
                        .onTapGesture { onSelectIssue(issue) }

                    if issue.persistentModelID != unpinnedIssues.last?.persistentModelID {
                        Divider().padding(.leading, 44)
                    }
                }
            }
            .padding(.top, 8)
        }
    }
}

private struct ThemeAreaRow: View {
    let issue: Issue

    var body: some View {
        HStack(spacing: 12) {
            ZStack {
                Circle()
                    .fill(issue.status.color)
                    .frame(width: 14, height: 14)
                if issue.isSnoozed {
                    Image(systemName: "moon.fill")
                        .font(.system(size: 7))
                        .foregroundColor(.white)
                }
            }
            .frame(width: 30)

            VStack(alignment: .leading, spacing: 2) {
                Text(issue.bodyPart.displayName)
                    .font(.subheadline)
                    .fontWeight(.medium)
                Text(issue.specificIssue)
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .lineLimit(1)
            }

            Spacer()

            Text(issue.status.rawValue)
                .font(.caption2)
                .foregroundStyle(issue.status.color)
                .padding(.horizontal, 8)
                .padding(.vertical, 3)
                .background(issue.status.color.opacity(0.12), in: Capsule())

            Image(systemName: "chevron.right")
                .font(.caption2)
                .foregroundStyle(.tertiary)
        }
        .padding(.horizontal)
        .padding(.vertical, 10)
    }
}
