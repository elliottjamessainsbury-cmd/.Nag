# Setting up the Nag Xcode project

Follow these steps once Xcode is installed on your Mac.

## Step 1: Create a new Xcode project

1. Open Xcode
2. Click **Create New Project** (or File → New → Project)
3. Select **iOS** at the top, then choose the **App** template → Next
4. Fill in the details:
   - **Product Name:** `Nag`
   - **Team:** your Apple ID (sign in if prompted)
   - **Organization Identifier:** something like `com.yourname.nag` — doesn't matter for now
   - **Interface:** SwiftUI
   - **Storage:** SwiftData
5. Choose where to save it on your Mac → Create

Xcode will generate a starter project with a few files already in it.

## Step 2: Clone this repo

In Terminal (you can find it with Spotlight — Cmd + Space, type Terminal):

```bash
git clone https://github.com/elliottjamessainsbury-cmd/.Nag.git
```

## Step 3: Add the model files to your Xcode project

1. In Finder, open the cloned repo and navigate to `Nag/Models/`
2. In Xcode, right-click the **Nag** folder in the left sidebar → **Add Files to "Nag"**
3. Select all five `.swift` files from `Nag/Models/`
4. Make sure **Copy items if needed** is ticked and the **Nag** target is selected → Add

## Step 4: Build

Press **Cmd + B** to build. If it compiles without errors, the data model is wired up correctly.

> If you see errors about missing types, make sure all five model files were added to the correct target.
