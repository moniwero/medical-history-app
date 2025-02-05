# 📌 Medical History App

### Mój pierwszy projekt w React! 🚀

Aplikacja webowa do zarządzania wynikami badań w określonych kategoriach. Umożliwia dodawanie, przeglądanie oraz usuwanie wyników wraz z przypisanymi obrazami.

## 📖 Opis projektu

Aplikacja została stworzona przy użyciu **React.js** i **Vite**, co zapewnia szybkie działanie oraz łatwą konfigurację środowiska deweloperskiego. Do obsługi backendu wykorzystano **Supabase**.

## 🛠 Technologie

- **React.js** – frontend aplikacji
- **Vite** – szybkie środowisko deweloperskie
- **React Router** – nawigacja między stronami
- **Material UI (MUI)** – komponenty UI
- **Supabase** – baza danych i przechowywanie obrazów
- **SCSS** – stylowanie aplikacji

## ⚙️ Wymagania systemowe

Aby uruchomić projekt lokalnie, wymagane są:

- **Node.js** (v16+)
- **NPM** lub **Yarn**

## 📂 Instalacja i uruchomienie

1. **Sklonuj repozytorium:**

   ```bash
   git clone https://github.com/moniwero/medical-history-app.git
   cd medical-history-app
   ```

2. **Zainstaluj zależności:**

   ```bash
   npm install
   ```

3. **Skonfiguruj zmienne środowiskowe:**

   Utwórz plik `.env` w katalogu głównym i dodaj:

   ```env
   VITE_SUPABASE_URL=twoja-url-supabase
   VITE_SUPABASE_ANON_KEY=twoj-klucz-anonimowy
   ```

4. **Uruchom aplikację:**

   ```bash
   npm run dev
   ```

## 🎯 Funkcjonalności

- 📌 **Przeglądanie wyników** – Użytkownik może zobaczyć wyniki dla wybranej kategorii.
- ➕ **Dodawanie wyników** – Możliwość dodania wyniku wraz z obrazem.
- ❌ **Usuwanie wyników** – Opcja usunięcia wyników wraz z obrazami.
- 🔍 **Podgląd obrazów** – Powiększanie i przeglądanie obrazów w modalu.

## 📌 Struktura projektu

```
📂 src
├── 📂 components   # Komponenty UI
├── 📂 pages        # Widoki stron
├── 📂 services     # Konfiguracja Supabase, funkcje dla user i result
├── 📂 styles       # Pliki SCSS
├── App.js         # Główny komponent aplikacji
├── main.jsx       # Punkt wejściowy aplikacji
```

## 📝 Komentarze w kodzie

Kod jest opatrzony komentarzami, szczególnie w kluczowych miejscach, np. obsługa modala, usuwanie wyników czy konfiguracja Supabase.

## 📬 Kontakt

Masz pytania lub sugestie? Skontaktuj się:
📧 **Email:** mmonisiabb@gmail.com  
🐙 **GitHub Issues:** [Zgłoś problem](https://github.com/moniwero/medical-history-app/issues)

---

Dzięki za zainteresowanie moim projektem! 😊
