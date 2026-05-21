import SwiftUI

struct BodyIllustrationView: View {
    let issues: [Issue]
    let side: BodyMapSide
    let onSelectIssue: (Issue) -> Void

    var body: some View {
        GeometryReader { geo in
            let w = geo.size.width
            let h = geo.size.height

            ZStack(alignment: .topLeading) {
                BodySilhouette(side: side)

                ForEach(pinnedIssues) { issue in
                    if let pos = issue.bodyPart.bodyMapPosition {
                        HeatSpotView(issue: issue) {
                            onSelectIssue(issue)
                        }
                        .position(x: pos.x * w, y: pos.y * h)
                    }
                }
            }
        }
    }

    private var pinnedIssues: [Issue] {
        issues.filter {
            $0.bodyPart.isPinnedToBody && $0.bodyPart.mapSide == side
        }
    }
}
