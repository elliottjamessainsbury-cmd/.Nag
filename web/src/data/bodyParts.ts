export type BodyPartGroup =
  | 'Head & Neck' | 'Shoulders' | 'Arms' | 'Wrists & Hands'
  | 'Back' | 'Legs' | 'Knees' | 'Feet & Toes'
  | 'Intimate' | 'Theme Areas' | 'Other'

export interface BodyPartDef {
  id: string
  displayName: string
  group: BodyPartGroup
  isPinnedToBody: boolean
  mapSide: 'front' | 'back'
  position?: { x: number; y: number }
}

export const BODY_PART_GROUPS: BodyPartGroup[] = [
  'Head & Neck', 'Shoulders', 'Arms', 'Wrists & Hands',
  'Back', 'Legs', 'Knees', 'Feet & Toes',
  'Intimate', 'Theme Areas', 'Other',
]

export const BODY_PARTS: BodyPartDef[] = [
  { id: 'head',          displayName: 'Head',           group: 'Head & Neck',    isPinnedToBody: true,  mapSide: 'front', position: { x: 0.50, y: 0.05 } },
  { id: 'neck',          displayName: 'Neck',           group: 'Head & Neck',    isPinnedToBody: true,  mapSide: 'front', position: { x: 0.50, y: 0.12 } },
  { id: 'leftShoulder',  displayName: 'Left shoulder',  group: 'Shoulders',      isPinnedToBody: true,  mapSide: 'front', position: { x: 0.68, y: 0.18 } },
  { id: 'rightShoulder', displayName: 'Right shoulder', group: 'Shoulders',      isPinnedToBody: true,  mapSide: 'front', position: { x: 0.32, y: 0.18 } },
  { id: 'leftUpperArm',  displayName: 'Left upper arm', group: 'Arms',           isPinnedToBody: true,  mapSide: 'front', position: { x: 0.73, y: 0.27 } },
  { id: 'rightUpperArm', displayName: 'Right upper arm',group: 'Arms',           isPinnedToBody: true,  mapSide: 'front', position: { x: 0.27, y: 0.27 } },
  { id: 'leftLowerArm',  displayName: 'Left lower arm', group: 'Arms',           isPinnedToBody: true,  mapSide: 'front', position: { x: 0.76, y: 0.38 } },
  { id: 'rightLowerArm', displayName: 'Right lower arm',group: 'Arms',           isPinnedToBody: true,  mapSide: 'front', position: { x: 0.24, y: 0.38 } },
  { id: 'leftWrist',     displayName: 'Left wrist',     group: 'Wrists & Hands', isPinnedToBody: true,  mapSide: 'front', position: { x: 0.78, y: 0.47 } },
  { id: 'rightWrist',    displayName: 'Right wrist',    group: 'Wrists & Hands', isPinnedToBody: true,  mapSide: 'front', position: { x: 0.22, y: 0.47 } },
  { id: 'leftFingers',   displayName: 'Left fingers',   group: 'Wrists & Hands', isPinnedToBody: true,  mapSide: 'front', position: { x: 0.79, y: 0.54 } },
  { id: 'rightFingers',  displayName: 'Right fingers',  group: 'Wrists & Hands', isPinnedToBody: true,  mapSide: 'front', position: { x: 0.21, y: 0.54 } },
  { id: 'upperBack',     displayName: 'Upper back',     group: 'Back',           isPinnedToBody: true,  mapSide: 'back',  position: { x: 0.50, y: 0.22 } },
  { id: 'lowerBack',     displayName: 'Lower back',     group: 'Back',           isPinnedToBody: true,  mapSide: 'back',  position: { x: 0.50, y: 0.34 } },
  { id: 'leftUpperLeg',  displayName: 'Left upper leg', group: 'Legs',           isPinnedToBody: true,  mapSide: 'front', position: { x: 0.57, y: 0.63 } },
  { id: 'rightUpperLeg', displayName: 'Right upper leg',group: 'Legs',           isPinnedToBody: true,  mapSide: 'front', position: { x: 0.43, y: 0.63 } },
  { id: 'leftLowerLeg',  displayName: 'Left lower leg', group: 'Legs',           isPinnedToBody: true,  mapSide: 'front', position: { x: 0.57, y: 0.81 } },
  { id: 'rightLowerLeg', displayName: 'Right lower leg',group: 'Legs',           isPinnedToBody: true,  mapSide: 'front', position: { x: 0.43, y: 0.81 } },
  { id: 'leftKnee',      displayName: 'Left knee',      group: 'Knees',          isPinnedToBody: true,  mapSide: 'front', position: { x: 0.57, y: 0.72 } },
  { id: 'rightKnee',     displayName: 'Right knee',     group: 'Knees',          isPinnedToBody: true,  mapSide: 'front', position: { x: 0.43, y: 0.72 } },
  { id: 'leftFoot',      displayName: 'Left foot',      group: 'Feet & Toes',    isPinnedToBody: true,  mapSide: 'front', position: { x: 0.57, y: 0.92 } },
  { id: 'rightFoot',     displayName: 'Right foot',     group: 'Feet & Toes',    isPinnedToBody: true,  mapSide: 'front', position: { x: 0.43, y: 0.92 } },
  { id: 'leftToes',      displayName: 'Left toes',      group: 'Feet & Toes',    isPinnedToBody: true,  mapSide: 'front', position: { x: 0.58, y: 0.97 } },
  { id: 'rightToes',     displayName: 'Right toes',     group: 'Feet & Toes',    isPinnedToBody: true,  mapSide: 'front', position: { x: 0.42, y: 0.97 } },
  { id: 'penis',         displayName: 'Penis',          group: 'Intimate',       isPinnedToBody: false, mapSide: 'front' },
  { id: 'vagina',        displayName: 'Vagina',         group: 'Intimate',       isPinnedToBody: false, mapSide: 'front' },
  { id: 'bum',           displayName: 'Bum',            group: 'Intimate',       isPinnedToBody: false, mapSide: 'front' },
  { id: 'stomach',       displayName: 'Stomach',        group: 'Theme Areas',    isPinnedToBody: false, mapSide: 'front' },
  { id: 'gut',           displayName: 'Gut',            group: 'Theme Areas',    isPinnedToBody: false, mapSide: 'front' },
  { id: 'skinIssues',    displayName: 'Skin issues',    group: 'Theme Areas',    isPinnedToBody: false, mapSide: 'front' },
  { id: 'dental',        displayName: 'Dental',         group: 'Theme Areas',    isPinnedToBody: false, mapSide: 'front' },
  { id: 'ears',          displayName: 'Ears',           group: 'Theme Areas',    isPinnedToBody: false, mapSide: 'front' },
  { id: 'nose',          displayName: 'Nose',           group: 'Theme Areas',    isPinnedToBody: false, mapSide: 'front' },
  { id: 'throat',        displayName: 'Throat',         group: 'Theme Areas',    isPinnedToBody: false, mapSide: 'front' },
  { id: 'vision',        displayName: 'Vision',         group: 'Theme Areas',    isPinnedToBody: false, mapSide: 'front' },
  { id: 'other',         displayName: 'Other',          group: 'Other',          isPinnedToBody: false, mapSide: 'front' },
]

export function getBodyPart(id: string): BodyPartDef | undefined {
  return BODY_PARTS.find(p => p.id === id)
}
