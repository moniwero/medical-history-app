Moj pierwszy projekt w React!

📌 Dokumentacja i README

📖 Opis projektu

Aplikacja webowa służy do zarządzania wynikami badań w określonych kategoriach. Pozwala użytkownikom na dodawanie, przeglądanie oraz usuwanie wyników wraz z przypisanymi obrazami. Aplikacja została zbudowana z wykorzystaniem React.js, React Router, Material UI oraz Supabase jako backendu do przechowywania danych i plików.

Projekt został stworzony przy użyciu React + Vite, co zapewnia szybkie działanie i łatwą konfigurację środowiska deweloperskiego.

🚀 Technologie użyte w projekcie

- React.js – frontend aplikacji

- Vite – szybkie środowisko deweloperskie

- React Router – nawigacja między stronami

- Material UI (MUI) – komponenty UI

- Supabase – baza danych oraz przechowywanie obrazów

- SCSS – stylowanie aplikacji

🛠 Wymagania systemowe

Aby uruchomić projekt lokalnie, wymagane są:

- Node.js w wersji 16+

- NPM lub Yarn

📂 Instalacja i uruchomienie

Sklonuj repozytorium:

git clone https://github.com/moniwero/medical-history-app.git
cd medical-history-app

Zainstaluj zależności:

npm install

Skonfiguruj zmienne środowiskowe:
Utwórz plik .env w głównym katalogu i uzupełnij go danymi:

VITE_SUPABASE_URL=twoja-url-supabase
VITE_SUPABASE_ANON_KEY=twoj-klucz-anonimowy

Uruchom aplikację:

npm run dev

🔧 Opcje konfiguracyjne

Wszystkie konfiguracje środowiskowe znajdują się w pliku .env.

Zmienna środowiskowa

Opis

VITE_APP_SUPABASE_URL

URL Supabase

VITE_SUPABASE_ANON_KEY

Klucz anonimizacyjny do Supabase

🎯 Przypadki użycia

Przeglądanie wyników – użytkownik może zobaczyć wyniki dla wybranej kategorii.

Dodawanie nowych wyników – użytkownik może dodać nowy wynik i załączyć obraz.

Usuwanie wyników – użytkownik może usunąć wynik wraz z obrazem.

Podgląd obrazów – użytkownik może powiększyć i przeglądać obrazy wyników w modalu.

📌 Struktura projektu

📂 src
├── 📂 components # Komponenty UI
├── 📂 pages # Widoki stron
├── 📂 services # Konfiguracja Supabase, funkcje dla user i result
├── 📂 styles # Pliki SCSS
├── App.js # Główny komponent aplikacji
├── main.jsx # Punkt wejściowy aplikacji

📝 Komentarze w kodzie

Kod został opatrzony komentarzami, szczególnie w miejscach, gdzie logika może być trudniejsza do zrozumienia, np. obsługa modala, usuwanie wyników czy konfiguracja Supabase.

📬 Kontakt

W razie pytań lub sugestii skontaktuj się poprzez e-mail: twoj-email@example.com lub otwórz issue na GitHubie.
