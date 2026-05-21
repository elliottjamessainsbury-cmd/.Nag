import SwiftUI
import SwiftData

struct RootView: View {
    @Query private var settingsArray: [UserSettings]

    // Driven by @Query — updates automatically when UserSettings is inserted/changed.
    private var onboardingComplete: Bool {
        settingsArray.first?.hasCompletedOnboarding == true
    }

    // Local state so we can wrap the switch in withAnimation.
    @State private var showBodyMap = false

    var body: some View {
        ZStack {
            if showBodyMap {
                BodyMapView()
                    .transition(.opacity)
            } else {
                OnboardingView(onComplete: {})
                    .transition(.opacity)
            }
        }
        .onAppear {
            // Set initial state without animation (cold launch).
            showBodyMap = onboardingComplete
        }
        .onChange(of: onboardingComplete) { _, complete in
            // Animate the switch once onboarding writes hasCompletedOnboarding = true.
            if complete {
                withAnimation(.easeInOut(duration: 0.5)) {
                    showBodyMap = true
                }
            }
        }
    }
}
