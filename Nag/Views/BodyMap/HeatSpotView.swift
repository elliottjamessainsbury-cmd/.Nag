import SwiftUI

struct HeatSpotView: View {
    let issue: Issue
    let onTap: () -> Void

    @State private var isPulsing = false

    private var spotColor: Color  { issue.status.color }
    private var dotSize: CGFloat  { issue.isResolved ? 14 : 18 }
    private var dotOpacity: Double { issue.isResolved ? 0.45 : 1.0 }

    var body: some View {
        ZStack {
            // Outer pulse ring — only on active issues
            if !issue.isResolved {
                Circle()
                    .fill(spotColor.opacity(0.25))
                    .frame(width: dotSize * 2.2, height: dotSize * 2.2)
                    .scaleEffect(isPulsing ? 1.4 : 1.0)
                    .opacity(isPulsing ? 0.0 : 1.0)
            }

            // Core dot
            Circle()
                .fill(spotColor)
                .frame(width: dotSize, height: dotSize)
                .opacity(dotOpacity)

            // Snooze badge
            if issue.isSnoozed {
                Image(systemName: "moon.fill")
                    .font(.system(size: 7))
                    .foregroundColor(.white)
            }
        }
        .onTapGesture(perform: onTap)
        .onAppear {
            guard !issue.isResolved else { return }
            withAnimation(
                .easeInOut(duration: 1.5)
                .repeatForever(autoreverses: false)
            ) {
                isPulsing = true
            }
        }
    }
}
