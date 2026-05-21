import Foundation
import SwiftData

enum NotificationFrequency: String, Codable, CaseIterable, Identifiable {
    case low    = "Low"
    case medium = "Medium"
    case high   = "High"

    var id: String { rawValue }

    // Base daily count for red (no action taken) issues.
    var dailyCount: Int {
        switch self {
        case .low:    return 10
        case .medium: return 20
        case .high:   return 30
        }
    }

    var description: String { "\(dailyCount) times a day" }
}

enum NotificationTone: String, Codable, CaseIterable, Identifiable {
    case sassy = "Sassy"
    case calm  = "Calm"

    var id: String { rawValue }

    var description: String {
        switch self {
        case .sassy: return "Cheeky and confrontational"
        case .calm:  return "Gentle and supportive"
        }
    }
}

// Singleton settings record. The app creates exactly one instance on first launch.
@Model
final class UserSettings {

    var userName: String
    var notificationFrequency: NotificationFrequency
    var notificationTone: NotificationTone
    // Time-of-day stored as Date; only the hour and minute components are used by the scheduler.
    var wakeUpTime: Date
    var sleepTime: Date
    var hasCompletedOnboarding: Bool

    init() {
        self.userName                = ""
        self.notificationFrequency   = .medium
        self.notificationTone        = .sassy
        self.hasCompletedOnboarding  = false

        var wake = DateComponents()
        wake.hour = 7; wake.minute = 0
        self.wakeUpTime = Calendar.current.date(from: wake) ?? Date()

        var sleep = DateComponents()
        sleep.hour = 22; sleep.minute = 0
        self.sleepTime = Calendar.current.date(from: sleep) ?? Date()
    }
}
