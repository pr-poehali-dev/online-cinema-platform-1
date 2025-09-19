import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface Movie {
  id: number;
  title: string;
  genre: string;
  year: number;
  rating: number;
  duration: string;
  poster: string;
  featured: boolean;
  description: string;
  views?: number;
}

const mockMovies: Movie[] = [
  {
    id: 1,
    title: "Космическая Одиссея",
    genre: "Sci-Fi",
    year: 2024,
    rating: 8.7,
    duration: "2ч 15м",
    poster: "/img/bcf5089b-e9f3-4ae4-9a82-7b1ac289bfa1.jpg",
    featured: true,
    description: "Эпическое путешествие в далёкие галактики, где человечество встречает неизвестные формы жизни",
    views: 2341
  },
  {
    id: 2,
    title: "Тёмный Город",
    genre: "Thriller",
    year: 2024,
    rating: 9.1,
    duration: "1ч 58м",
    poster: "/img/870eeac2-c775-4ea6-9199-306ac91023b9.jpg",
    featured: true,
    description: "Напряжённый триллер о детективе, расследующем серию загадочных преступлений",
    views: 4523
  },
  {
    id: 3,
    title: "Магический Лес",
    genre: "Fantasy",
    year: 2024,
    rating: 8.3,
    duration: "2ч 32м",
    poster: "/img/0e6e0981-f6d4-49e5-ba08-bdafe75f8a4a.jpg",
    featured: false,
    description: "Фантастическое приключение в мире магии, где древние силы пробуждаются",
    views: 1876
  }
];

const genres = ["Все жанры", "Sci-Fi", "Thriller", "Fantasy", "Drama", "Comedy", "Action"];

export default function Index() {
  const [selectedGenre, setSelectedGenre] = useState("Все жанры");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSection, setCurrentSection] = useState("Главная");

  const filteredMovies = mockMovies.filter(movie => {
    const matchesGenre = selectedGenre === "Все жанры" || movie.genre === selectedGenre;
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  const featuredMovies = mockMovies.filter(movie => movie.featured);
  
  const getPersonalRecommendations = () => {
    return mockMovies.sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 2);
  };

  const recommendations = getPersonalRecommendations();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                CineStream
              </h1>
              <nav className="hidden md:flex space-x-6">
                {["Главная", "Фильмы", "Сериалы", "Новинки"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setCurrentSection(item)}
                    className={`px-3 py-2 rounded-md transition-colors ${
                      currentSection === item
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                <Input
                  placeholder="Поиск фильмов..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="icon">
                <Icon name="User" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        {currentSection === "Главная" && featuredMovies.length > 0 && (
          <section className="mb-12">
            <div 
              className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${featuredMovies[0].poster})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
              <div className="relative z-10 max-w-2xl p-8">
                <Badge className="mb-4 bg-primary">{featuredMovies[0].genre}</Badge>
                <h2 className="text-5xl font-bold mb-4">{featuredMovies[0].title}</h2>
                <p className="text-lg text-muted-foreground mb-6 line-clamp-3">
                  {featuredMovies[0].description}
                </p>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Icon name="Star" className="text-yellow-400 fill-yellow-400" size={20} />
                    <span className="font-semibold">{featuredMovies[0].rating}</span>
                  </div>
                  <span className="text-muted-foreground">{featuredMovies[0].year}</span>
                  <span className="text-muted-foreground">{featuredMovies[0].duration}</span>
                </div>
                <div className="flex space-x-4">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    <Icon name="Play" className="mr-2" size={20} />
                    Смотреть
                  </Button>
                  <Button variant="outline" size="lg">
                    <Icon name="Plus" className="mr-2" size={20} />
                    В избранное
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Personalized Recommendations */}
        {currentSection === "Главная" && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Рекомендации для вас</h3>
              <Button variant="ghost">
                <Icon name="TrendingUp" className="mr-2" size={16} />
                На основе ваших просмотров
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {recommendations.map((movie) => (
                <Card key={movie.id} className="group hover:scale-105 transition-transform duration-300 bg-card border-border/50 hover:border-primary/50">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="bg-black/70 text-white">
                          <Icon name="Eye" size={12} className="mr-1" />
                          {movie.views}
                        </Badge>
                      </div>
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button size="sm" className="bg-primary">
                          <Icon name="Play" size={16} />
                        </Button>
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="font-semibold text-sm mb-1 line-clamp-1">{movie.title}</h4>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{movie.year}</span>
                        <div className="flex items-center space-x-1">
                          <Icon name="Star" className="text-yellow-400 fill-yellow-400" size={12} />
                          <span>{movie.rating}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Genre Filter */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">
              {currentSection === "Главная" ? "Каталог фильмов" : currentSection}
            </h3>
            <div className="flex items-center space-x-2">
              <Icon name="Filter" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Жанр:</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {genres.map((genre) => (
              <Button
                key={genre}
                variant={selectedGenre === genre ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedGenre(genre)}
                className={selectedGenre === genre ? "bg-primary" : ""}
              >
                {genre}
              </Button>
            ))}
          </div>
        </section>

        {/* Movies Grid */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredMovies.map((movie) => (
              <Card key={movie.id} className="group hover:scale-105 transition-all duration-300 bg-card border-border/50 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-72 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-primary">{movie.genre}</Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <div className="flex items-center space-x-1 bg-black/70 text-white px-2 py-1 rounded-md text-xs">
                        <Icon name="Star" className="text-yellow-400 fill-yellow-400" size={12} />
                        <span>{movie.rating}</span>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="text-center">
                        <Button size="lg" className="bg-primary mb-2">
                          <Icon name="Play" className="mr-2" size={20} />
                          Смотреть
                        </Button>
                        <Button variant="outline" size="sm">
                          <Icon name="Info" className="mr-2" size={16} />
                          Подробнее
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-lg mb-2 line-clamp-1">{movie.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {movie.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{movie.year}</span>
                      <span className="text-muted-foreground">{movie.duration}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {filteredMovies.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Фильмы не найдены</h3>
            <p className="text-muted-foreground">
              Попробуйте изменить фильтры или поисковый запрос
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                CineStream
              </h4>
              <p className="text-sm text-muted-foreground">
                Лучший онлайн кинотеатр с персональными рекомендациями
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Контент</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Фильмы</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Сериалы</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Новинки</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Поддержка</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Помощь</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Условия</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Следите за нами</h5>
              <div className="flex space-x-3">
                <Button variant="outline" size="icon">
                  <Icon name="Instagram" size={16} />
                </Button>
                <Button variant="outline" size="icon">
                  <Icon name="Twitter" size={16} />
                </Button>
                <Button variant="outline" size="icon">
                  <Icon name="Facebook" size={16} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-6 text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 CineStream. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}