import SwiftUI
import SwiftData

@main
struct NagApp: App {
    let container: ModelContainer

    init() {
        do {
            container = try ModelContainer(for: Issue.self, UserSettings.self)
        } catch {
            fatalError("SwiftData container failed to initialise: \(error)")
        }
    }

    var body: some Scene {
        WindowGroup {
            RootView()
        }
        .modelContainer(container)
    }
}
