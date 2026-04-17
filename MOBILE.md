# Mobile Developer Path — Android

If you're an Android developer paired with a designer, this is your track.

You're NOT on Next.js today. You're on **Jetpack Compose** with **GitHub Copilot**. Same specs, same pattern, different stack.

---

## What stays the same

- **The 3 specs:** `feature-brief.md`, `design-system-spec.md`, `app-spec.md` — you write these with your pair, same as web teams
- **Spec writing is the core lesson** — same skill, same quality bar
- **The handoff:** designer builds the design system in Figma; you consume it
- **Three deliverables:** spec + design system (designer) + working app with tests (you)
- **Three awards:** Best Spec, Best Design System, Best App

---

## What's different

| Layer | Web team | You (Android) |
|---|---|---|
| App framework | Next.js + React | Jetpack Compose |
| Language | TypeScript | Kotlin |
| UI composition | React components | @Composable functions |
| Design tokens | CSS variables | Compose Theme (Color.kt, Typography.kt) |
| State | Context + useReducer | ViewModel + StateFlow |
| Persistence | localStorage | DataStore or Room |
| Tests | Playwright | Compose UI Testing (`androidx.compose.ui.test`) |
| Tool | GitHub Copilot in VS Code OR Android Studio | GitHub Copilot in Android Studio |

---

## Your setup

### Before the workshop
1. **Android Studio** installed and working with SDK 34+
2. **GitHub Copilot** extension in Android Studio, signed in
3. Clone this repo for the specs + agent docs (you won't run `npm install` — that's for web)
4. **Create a new Android project** in Android Studio:
   - File → New → New Project
   - Empty Activity (Compose)
   - Package: `com.deliveryloop.<yourproject>`
   - Min SDK: 26+
   - Build and run once to verify the default app launches in the emulator

### On event day

Keep both open:
- Android Studio with your Compose project
- This repo (`delivery-loop/`) in a file browser or second window for specs and docs

---

## The parallel flow

### Spec It (20 min) — same as web

You and your designer write the three specs together. Use the templates in `templates/`. The specs work identically for mobile.

One note: in the design-system-spec, your pair is describing **conceptual components** (Button, Card, SkillBadge). The designer builds them in React/Figma. You'll build Compose equivalents — the API surface transfers, the implementation doesn't.

### Build It (90 min) — parallel build

**Designer** builds:
- Tokens in `tokens/tokens.css` (web)
- Coded React components in `components/` (web)
- Figma library

**You** build in Android Studio:
- Theme values in `ui/theme/Color.kt`, `Typography.kt`, `Shape.kt` — map the designer's tokens to Compose values
- `@Composable` equivalents in `ui/components/` — same API as the React ones (Button, Input, SkillBadge, etc.)
- Screens in `ui/screens/` — consume those composables only
- State in a `ViewModel` + `StateFlow`

### Port the tokens

When the designer writes `tokens/tokens.css`, you translate:

```css
--accent-default: #6366f1;
--bg-base: #0a0a0f;
--space-4: 1rem;  /* 16dp */
--radius-md: 0.5rem;  /* 8dp */
```

Becomes in `Color.kt`:
```kotlin
val AccentDefault = Color(0xFF6366F1)
val BgBase = Color(0xFF0A0A0F)
```

In `Shape.kt`:
```kotlin
val Shapes = Shapes(
    small = RoundedCornerShape(6.dp),
    medium = RoundedCornerShape(8.dp),
    large = RoundedCornerShape(12.dp),
)
```

Everyone on the team agrees: tokens are the contract. Values flow designer → you.

### Compose tests (your Playwright equivalent)

One UI test per user flow in your `app-spec.md`. Example:

```kotlin
@RunWith(AndroidJUnit4::class)
class CreateProfileTest {
    @get:Rule
    val composeRule = createAndroidComposeRule<MainActivity>()

    @Test
    fun user_creates_profile_and_sees_it_in_directory() {
        composeRule.onNodeWithText("Create Profile").performClick()
        composeRule.onNodeWithTag("name-input").performTextInput("Jamie Rivera")
        composeRule.onNodeWithTag("role-input").performTextInput("Design Engineer")
        composeRule.onNodeWithText("Save").performClick()
        composeRule.onNodeWithText("Directory").performClick()
        composeRule.onNodeWithText("Jamie Rivera").assertIsDisplayed()
    }
}
```

Use semantic queries (`onNodeWithText`, `onNodeWithContentDescription`) not implementation details.

---

## Copilot prompts tuned for you

Put these in Copilot Chat to get Android-flavored responses:

```
I'm an Android developer building a Compose app. My pair is using
React for the same design system. Read feature-brief.md and app-spec.md.
Scaffold a Compose app with:
- ViewModel + StateFlow for state
- DataStore for persistence
- Theme in ui/theme/ mapped from the designer's CSS tokens
- Composables that mirror the components the designer is building
- Compose UI tests (one per user flow)
```

---

## Your showcase demo (90 seconds)

Same shape as web teams:
1. **Flash the spec** (15s) — "We wrote these specs, here's what worked"
2. **Show your design system** (25s) — scroll through your composables, show the theme matching the designer's Figma
3. **Show the app + tests** (35s) — run the flow on the emulator, then run Compose UI tests live (green checks)
4. **Score + one thing you'd fix** (15s)

---

## Why this is worth doing even if the web team has "more" built

- The **spec-writing** skill is stack-agnostic. This is what you take home.
- The **handoff discipline** (designer owns system, dev owns app) is stack-agnostic.
- Android Compose + AI is exactly the workflow you want for your day job.
- You're not watching; you're shipping.

---

## When things break

- **Gradle sync fails** → flag to a facilitator fast. Don't burn 30 min on it.
- **Compose preview won't render** → use the emulator instead. Don't block on IDE issues.
- **Can't match a designer's component exactly** → ship the closest approximation. Note the diff in your demo.
- **Tests fail** → fix the 1-2 that matter most, skip the rest. Green on the happy path beats red on the full suite.
