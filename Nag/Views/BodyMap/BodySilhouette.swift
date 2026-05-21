import SwiftUI

// Placeholder human outline. Replace with a custom SVG illustration asset before shipping.
// All positions are expressed as fractions of the view's width (w) and height (h).
struct BodySilhouette: View {
    let side: BodyMapSide

    var body: some View {
        GeometryReader { geo in
            let w = geo.size.width
            let h = geo.size.height
            ZStack {
                // Head
                Ellipse()
                    .stroke(lineWidth: 1.5)
                    .frame(width: w * 0.24, height: h * 0.10)
                    .position(x: w * 0.50, y: h * 0.055)

                // Neck
                Rectangle()
                    .stroke(lineWidth: 1.5)
                    .frame(width: w * 0.09, height: h * 0.045)
                    .position(x: w * 0.50, y: h * 0.128)

                // Torso
                RoundedRectangle(cornerRadius: 12)
                    .stroke(lineWidth: 1.5)
                    .frame(width: w * 0.44, height: h * 0.28)
                    .position(x: w * 0.50, y: h * 0.325)

                // Person's left arm (screen right)
                RoundedRectangle(cornerRadius: 6)
                    .stroke(lineWidth: 1.5)
                    .frame(width: w * 0.10, height: h * 0.26)
                    .position(x: w * 0.76, y: h * 0.320)

                // Person's right arm (screen left)
                RoundedRectangle(cornerRadius: 6)
                    .stroke(lineWidth: 1.5)
                    .frame(width: w * 0.10, height: h * 0.26)
                    .position(x: w * 0.24, y: h * 0.320)

                // Person's left hand (screen right)
                Ellipse()
                    .stroke(lineWidth: 1.5)
                    .frame(width: w * 0.10, height: h * 0.045)
                    .position(x: w * 0.76, y: h * 0.465)

                // Person's right hand (screen left)
                Ellipse()
                    .stroke(lineWidth: 1.5)
                    .frame(width: w * 0.10, height: h * 0.045)
                    .position(x: w * 0.24, y: h * 0.465)

                // Person's left leg (screen right)
                RoundedRectangle(cornerRadius: 6)
                    .stroke(lineWidth: 1.5)
                    .frame(width: w * 0.17, height: h * 0.36)
                    .position(x: w * 0.58, y: h * 0.760)

                // Person's right leg (screen left)
                RoundedRectangle(cornerRadius: 6)
                    .stroke(lineWidth: 1.5)
                    .frame(width: w * 0.17, height: h * 0.36)
                    .position(x: w * 0.42, y: h * 0.760)

                // Person's left foot (screen right)
                Ellipse()
                    .stroke(lineWidth: 1.5)
                    .frame(width: w * 0.18, height: h * 0.045)
                    .position(x: w * 0.58, y: h * 0.958)

                // Person's right foot (screen left)
                Ellipse()
                    .stroke(lineWidth: 1.5)
                    .frame(width: w * 0.18, height: h * 0.045)
                    .position(x: w * 0.42, y: h * 0.958)

                if side == .back {
                    // Spine line hint on the back view
                    Path { path in
                        path.move(to:    CGPoint(x: w * 0.50, y: h * 0.155))
                        path.addLine(to: CGPoint(x: w * 0.50, y: h * 0.465))
                    }
                    .stroke(style: StrokeStyle(lineWidth: 1, dash: [4, 4]))
                }
            }
            .foregroundColor(.secondary.opacity(0.35))
        }
    }
}
