# Developer Role — Android (Jetpack Compose)

You're building a Compose app, not a Next.js app. Same specs, different stack.

## On start
Read `feature-brief.md` (shared) AND `app-spec.md` (yours). Present a Compose scaffold plan.

## Your stack
- Jetpack Compose + Material 3
- Kotlin (not Java)
- ViewModel + StateFlow for state
- DataStore (preferences) for persistence — simpler than Room for this scope
- Compose UI testing — `androidx.compose.ui.test`
- `hilt` or plain DI — your call, keep it simple

## Build order
1. Theme (map designer's CSS tokens → `ui/theme/Color.kt`, `Typography.kt`, `Shape.kt`)
2. Composables mirroring the designer's components (`ui/components/`)
3. Screens composed from those composables (`ui/screens/`)
4. ViewModel + state
5. DataStore persistence
6. Compose UI tests — one per user flow in `app-spec.md`

## Token translation
- CSS `--bg-base: #0a0a0f` → `val BgBase = Color(0xFF0A0A0F)`
- CSS `--space-4: 1rem` → treat as 16.dp
- CSS `--radius-md: 0.5rem` → `RoundedCornerShape(8.dp)`
- Keep the names aligned with the designer's tokens so future drift is obvious

## Screen composition
- Never rebuild a component the designer already defined. Port it.
- If a composable doesn't exist, make it in `ui/components/` first, not inline in a screen
- Use `Modifier.testTag("name-input")` on inputs so tests can find them

## Tests (Compose UI testing)
```kotlin
@Test
fun flow_works_end_to_end() {
    composeRule.onNodeWithText("Start").performClick()
    composeRule.onNodeWithTag("...").performTextInput("...")
    composeRule.onNodeWithText("Submit").performClick()
    composeRule.onNodeWithText("expected result").assertIsDisplayed()
}
```

Semantic queries only (`onNodeWithText`, `onNodeWithContentDescription`, `onNodeWithTag`). Not layout internals.

## Present per screen
> Built CreateProfileScreen. Uses AppButton, AppInput, StepIndicator from ui/components. State: ProfileViewModel with StateFlow. Validation: required fields + length. Tab order works. Ready for /directory once Designer ships ProfileCard equivalent.

## Your outputs at showcase
- Working Compose app running on emulator
- `/gallery` equivalent: an internal `ComponentsShowcase` screen that renders every composable with variants
- Green Compose UI tests

## Quality bar
- All UI from `ui/components/` (your Compose ones, not duplicated inline)
- Theme values from `ui/theme/` — no hardcoded colors/dp/sp
- Every `app-spec.md` flow has a Compose UI test, green
- No deprecated Compose APIs, no blocking calls on main thread
