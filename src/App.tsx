import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/layout'
import ConsentScreen from './features/onboarding/ConsentScreen'
import { useApplySettings } from './hooks/useApplySettings'
import { useSettings } from './store/settingsStore'

// Each page loads only when it is opened
const HomePage = lazy(() => import('./features/dashboard/HomePage'))
const ExercisesPage = lazy(() => import('./features/exercises/ExercisesPage'))
const ExercisePlayerPage = lazy(() => import('./features/exercises/ExercisePlayerPage'))
const RoutinePlayerPage = lazy(() => import('./features/exercises/RoutinePlayerPage'))
const RoutineBuilderPage = lazy(() => import('./features/exercises/RoutineBuilderPage'))
const GamesPage = lazy(() => import('./features/games/GamesPage'))
const GamePlayerPage = lazy(() => import('./features/games/GamePlayerPage'))
const NutritionPage = lazy(() => import('./features/nutrition/NutritionPage'))
const MorePage = lazy(() => import('./features/settings/MorePage'))
const SettingsPage = lazy(() => import('./features/settings/SettingsPage'))
const ConditionsPage = lazy(() => import('./features/conditions/ConditionsPage'))
const ConditionDetailPage = lazy(() => import('./features/conditions/ConditionDetailPage'))
const RewardsPage = lazy(() => import('./features/rewards/RewardsPage'))
const NotFoundPage = lazy(() => import('./features/NotFoundPage'))

export default function App() {
  useApplySettings()
  const consentAccepted = useSettings((state) => state.consentAccepted)

  if (!consentAccepted) {
    return <ConsentScreen />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="exercises" element={<ExercisesPage />} />
          <Route path="exercises/builder" element={<RoutineBuilderPage />} />
          <Route path="exercises/routine/:routineId" element={<RoutinePlayerPage />} />
          <Route path="exercises/:id" element={<ExercisePlayerPage />} />
          <Route path="games" element={<GamesPage />} />
          <Route path="games/:gameId" element={<GamePlayerPage />} />
          <Route path="nutrition" element={<NutritionPage />} />
          <Route path="more" element={<MorePage />} />
          <Route path="more/settings" element={<SettingsPage />} />
          <Route path="more/conditions" element={<ConditionsPage />} />
          <Route path="more/conditions/:id" element={<ConditionDetailPage />} />
          <Route path="more/rewards" element={<RewardsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}