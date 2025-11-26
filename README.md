# App Structure

This project is a small React + TypeScript application organised around a light MVVM-style structure (Models → ViewModels/Stores → Views).  
The goal of the structure is to keep API access, state management, and UI clearly separated and easy to extend.

---

## Project Structure

```text
src/
  main.tsx
  App.tsx
  index.css

  container/
    container.ts
    idetrifiers.ts

  clients/
    apiClients/
      SmartFactoryApiClient.ts
    DevicesClient/
      DevicesClient.ts
      dto/
        getDevicesDTO.ts
        getDevicesByIdDTO.ts
        updateDevicesByIdDTO.ts

  stores/
    DevicesStore.ts

  viewModels/
    base/
      BaseViewModel.ts
    DeviceViewModel.ts

  models/
    Device.ts

  services/
    LoggerService.ts

  screens/
    devices/
      Devices.tsx

  components/
    TouchableButton/
      TouchableButton.tsx
      fragments/
        TouchableButtonDescription.tsx

  types/
    pagination.ts
```

## Entry point

- **`main.tsx`** – Bootstraps the React application and renders `<App />` into the DOM.
- **`App.tsx`** – Top-level application shell. Usually contains routing, global providers, and layout.
- **`index.css`** – Global CSS (resets, fonts, basic layout).

---

## Dependency Injection: `container/`

- **`container.ts`** – Simple DI container / service locator. Registers and wires up singletons like API clients, stores, and services.  
  This keeps construction logic in one place instead of scattering `new ...()` calls across the app.
- **`idetrifiers.ts`** – Central place for DI identifiers/tokens used by the container (e.g. string/symbol keys for clients, stores, services).

---

## API Layer: `clients/`

- **`apiClients/SmartFactoryApiClient.ts`** – Low-level HTTP client responsible for talking to the backend (base URL, headers, error handling).
- **`DevicesClient/DevicesClient.ts`** – High-level client dedicated to all “devices” API calls. It uses `SmartFactoryApiClient` under the hood.
- **`DevicesClient/dto/*.ts`** – DTO (Data Transfer Object) types and mappers for the devices API:
  - `getDevicesDTO.ts` – Shapes for “get devices” requests/responses.
  - `getDevicesByIdDTO.ts` – Shapes for “get device by id”.
  - `updateDevicesByIdDTO.ts` – Shapes for “update device”.

Keeping DTOs here isolates external API contracts from internal models.

---

## Domain & State

### `models/`

- **`Device.ts`** – Domain model for a device. Represents how the rest of the app works with device data (independent of raw API DTOs).

### `stores/`

- **`DevicesStore.ts`** – Central state holder for devices (list, selected device, loading flags, errors, etc.).  
  ViewModels and screens use this store instead of calling the API directly.

---

## ViewModels: `viewModels/`

This layer sits between UI and the domain/state layer.

- **`base/BaseViewModel.ts`** – Base class for all ViewModels. Common logic (loading/error handling, disposal, helpers).
- **`DeviceViewModel.ts`** – ViewModel for device-related screens. Orchestrates:
  - Calling `DevicesClient` via the store.
  - Exposing simple properties for the UI (lists, current device, derived flags).
  - Providing actions like “load devices”, “refresh”, “update device”.

---

## UI Layer

### Screens: `screens/`

- **`screens/devices/Devices.tsx`** – Screen component for listing / managing devices. It:
  - Obtains `DeviceViewModel` (usually from the DI container).
  - Subscribes to its state.
  - Renders UI and delegates user interactions (clicks, updates) back to the ViewModel.

### Reusable Components: `components/`

- **`TouchableButton/TouchableButton.tsx`** – Reusable button component used across screens.
- **`TouchableButton/fragments/TouchableButtonDescription.tsx`** – Small presentational fragment (text/description) used inside the button.

Components here are meant to be “dumb” / presentational: they don’t know about API or business logic, only props.

---

## Services: `services/`

- **`LoggerService.ts`** – Wrapper around logging (console, external logger, etc.).  
  Exposed via the DI container so you can swap implementations without touching business or UI code.

---

## Shared Types: `types/`

- **`pagination.ts`** – Shared pagination types used in clients, models, and ViewModels.
