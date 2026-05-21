import Foundation
import CoreGraphics

enum BodyPartGroup: String, CaseIterable {
    case headAndNeck    = "Head & Neck"
    case shoulders      = "Shoulders"
    case arms           = "Arms"
    case wristsAndHands = "Wrists & Hands"
    case back           = "Back"
    case legs           = "Legs"
    case knees          = "Knees"
    case feetAndToes    = "Feet & Toes"
    case intimate       = "Intimate"
    case themeAreas     = "Theme Areas"
    case other          = "Other"
}

enum BodyMapSide: Hashable {
    case front, back
}

enum BodyPart: String, CaseIterable, Codable, Identifiable {

    // Head & Neck
    case head           = "Head"
    case neck           = "Neck"

    // Shoulders
    case leftShoulder   = "Left shoulder"
    case rightShoulder  = "Right shoulder"

    // Arms
    case leftUpperArm   = "Left upper arm"
    case rightUpperArm  = "Right upper arm"
    case leftLowerArm   = "Left lower arm"
    case rightLowerArm  = "Right lower arm"

    // Wrists & Hands
    case leftWrist      = "Left wrist"
    case rightWrist     = "Right wrist"
    case leftFingers    = "Left fingers"
    case rightFingers   = "Right fingers"

    // Back
    case upperBack      = "Upper back"
    case lowerBack      = "Lower back"

    // Legs
    case leftUpperLeg   = "Left upper leg"
    case rightUpperLeg  = "Right upper leg"
    case leftLowerLeg   = "Left lower leg"
    case rightLowerLeg  = "Right lower leg"

    // Knees
    case leftKnee       = "Left knee"
    case rightKnee      = "Right knee"

    // Feet & Toes
    case leftFoot       = "Left foot"
    case rightFoot      = "Right foot"
    case leftToes       = "Left toes"
    case rightToes      = "Right toes"

    // Intimate — shown below the illustration, not pinned to the body
    case penis          = "Penis"
    case vagina         = "Vagina"
    case bum            = "Bum"

    // Theme Areas
    case stomach        = "Stomach"
    case gut            = "Gut"
    case skinIssues     = "Skin issues"
    case dental         = "Dental"
    case ears           = "Ears"
    case nose           = "Nose"
    case throat         = "Throat"
    case vision         = "Vision"

    // Other
    case other          = "Other"

    var id: String { rawValue }
    var displayName: String { rawValue }

    var group: BodyPartGroup {
        switch self {
        case .head, .neck:                                                          return .headAndNeck
        case .leftShoulder, .rightShoulder:                                         return .shoulders
        case .leftUpperArm, .rightUpperArm, .leftLowerArm, .rightLowerArm:         return .arms
        case .leftWrist, .rightWrist, .leftFingers, .rightFingers:                  return .wristsAndHands
        case .upperBack, .lowerBack:                                                return .back
        case .leftUpperLeg, .rightUpperLeg, .leftLowerLeg, .rightLowerLeg:         return .legs
        case .leftKnee, .rightKnee:                                                 return .knees
        case .leftFoot, .rightFoot, .leftToes, .rightToes:                         return .feetAndToes
        case .penis, .vagina, .bum:                                                 return .intimate
        case .stomach, .gut, .skinIssues, .dental, .ears, .nose, .throat, .vision: return .themeAreas
        case .other:                                                                return .other
        }
    }

    // Theme areas, intimate parts, and Other appear in a list below the illustration.
    var isPinnedToBody: Bool {
        switch group {
        case .themeAreas, .intimate, .other: return false
        default: return true
        }
    }

    var mapSide: BodyMapSide {
        switch self {
        case .upperBack, .lowerBack: return .back
        default: return .front
        }
    }

    // Normalised (0–1) position on the body illustration for heat spot placement.
    // x=0 is left screen edge, x=1 is right. The person's LEFT side appears on the screen's RIGHT.
    // Placeholder values — calibrate against the final SVG asset.
    var bodyMapPosition: CGPoint? {
        guard isPinnedToBody else { return nil }
        switch self {
        case .head:           return CGPoint(x: 0.50, y: 0.05)
        case .neck:           return CGPoint(x: 0.50, y: 0.12)
        case .leftShoulder:   return CGPoint(x: 0.68, y: 0.18)
        case .rightShoulder:  return CGPoint(x: 0.32, y: 0.18)
        case .leftUpperArm:   return CGPoint(x: 0.73, y: 0.27)
        case .rightUpperArm:  return CGPoint(x: 0.27, y: 0.27)
        case .leftLowerArm:   return CGPoint(x: 0.76, y: 0.38)
        case .rightLowerArm:  return CGPoint(x: 0.24, y: 0.38)
        case .leftWrist:      return CGPoint(x: 0.78, y: 0.47)
        case .rightWrist:     return CGPoint(x: 0.22, y: 0.47)
        case .leftFingers:    return CGPoint(x: 0.79, y: 0.54)
        case .rightFingers:   return CGPoint(x: 0.21, y: 0.54)
        case .upperBack:      return CGPoint(x: 0.50, y: 0.22)
        case .lowerBack:      return CGPoint(x: 0.50, y: 0.34)
        case .leftUpperLeg:   return CGPoint(x: 0.57, y: 0.63)
        case .rightUpperLeg:  return CGPoint(x: 0.43, y: 0.63)
        case .leftKnee:       return CGPoint(x: 0.57, y: 0.72)
        case .rightKnee:      return CGPoint(x: 0.43, y: 0.72)
        case .leftLowerLeg:   return CGPoint(x: 0.57, y: 0.81)
        case .rightLowerLeg:  return CGPoint(x: 0.43, y: 0.81)
        case .leftFoot:       return CGPoint(x: 0.57, y: 0.92)
        case .rightFoot:      return CGPoint(x: 0.43, y: 0.92)
        case .leftToes:       return CGPoint(x: 0.58, y: 0.97)
        case .rightToes:      return CGPoint(x: 0.42, y: 0.97)
        default:              return nil
        }
    }
}
