import SwiftUI

enum IssueStatus: String, Codable, CaseIterable, Identifiable {
    case noActionTaken = "No action taken"
    case inProgress    = "In progress"
    case allFixed      = "All fixed!"

    var id: String { rawValue }

    var color: Color {
        switch self {
        case .noActionTaken: return .red
        case .inProgress:    return .orange
        case .allFixed:      return .green
        }
    }

    var emoji: String {
        switch self {
        case .noActionTaken: return "🔴"
        case .inProgress:    return "🟠"
        case .allFixed:      return "🟢"
        }
    }

    // Fraction of the user's base notification frequency assigned to issues at this status.
    // Red = full frequency, amber = half, green = none (trophy only).
    var notificationWeight: Double {
        switch self {
        case .noActionTaken: return 1.0
        case .inProgress:    return 0.5
        case .allFixed:      return 0.0
        }
    }

    var isResolved: Bool { self == .allFixed }
}

enum SnoozeDuration: String, CaseIterable, Identifiable {
    case oneDay    = "1 day"
    case threeDays = "3 days"
    case oneWeek   = "1 week"

    var id: String { rawValue }

    var days: Int {
        switch self {
        case .oneDay:    return 1
        case .threeDays: return 3
        case .oneWeek:   return 7
        }
    }
}
