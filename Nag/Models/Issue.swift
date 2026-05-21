import Foundation
import SwiftData

@Model
final class Issue {

    var bodyPart: BodyPart
    var specificIssue: String
    var status: IssueStatus
    var dateAdded: Date
    var snoozeUntil: Date?
    var resolvedDate: Date?

    init(bodyPart: BodyPart, specificIssue: String) {
        self.bodyPart      = bodyPart
        self.specificIssue = specificIssue
        self.status        = .noActionTaken
        self.dateAdded     = Date()
    }

    var isResolved: Bool { status == .allFixed }

    var isActiveForNotifications: Bool {
        guard status != .allFixed else { return false }
        guard let snoozeUntil else { return true }
        return snoozeUntil <= Date()
    }

    var isSnoozed: Bool {
        guard let snoozeUntil else { return false }
        return snoozeUntil > Date()
    }

    var daysActive: Int {
        let end = resolvedDate ?? Date()
        return Calendar.current.dateComponents([.day], from: dateAdded, to: end).day ?? 0
    }

    func updateStatus(_ newStatus: IssueStatus) {
        status = newStatus
        if newStatus == .allFixed {
            resolvedDate = Date()
            snoozeUntil  = nil
        }
    }

    func snooze(for duration: SnoozeDuration) {
        snoozeUntil = Calendar.current.date(byAdding: .day, value: duration.days, to: Date())
    }

    func cancelSnooze() {
        snoozeUntil = nil
    }
}
