import { Component, OnInit } from '@angular/core';
import { PoChartGaugeSerie, PoChartType, PoDonutChartSeries, PoPieChartSeries, PoDialogService } from '@po-ui/ng-components';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{

  brazilianCoffeeProduction: PoChartGaugeSerie = {
    value: 33,
    description: `fevereiro 2020  `
  };

  brazilianCoffeeProductionChartType: PoChartType = PoChartType.Gauge;

  coffeConsumingChartType: PoChartType = PoChartType.Donut;

  coffeeConsumption: Array<PoDonutChartSeries> = [
    { category: 'Forest', value: 9.6, tooltip: 'Forest Gump' },
    { category: 'Chaves', value: 7.2, tooltip: 'Chaves' },
    { category: 'Pelé', value: 6.7, tooltip: 'Pelé' },
    { category: 'Itachi', value: 6.1, tooltip: 'Itachi Uchiha' },
    { category: 'Faustão', value: 5.5, tooltip: 'Fausto Silva' }
  ];

  coffeeProduction: Array<PoPieChartSeries> = [
    { category: 'Anúncio simples', value: 2796, tooltip: 'Anuncio' },
    { category: 'Anúncio de pagina inteira', value: 1076, tooltip: 'Vietnam (Asia)' },
    { category: 'Charge', value: 688, tooltip: 'Colombia (South America)' },
    { category: 'Folder', value: 682, tooltip: 'Indonesia (Asia/Oceania)' },
    { category: 'Revista', value: 273, tooltip: 'Peru (South America)' }
  ];

  items: Array<any> = [
    { position: '1', company: 'Tim Hortons', location: 'Hamilton, Ontario, Canada', foundation: '1964' },
    { position: '2', company: 'Bewley’s', location: 'Dublin, Ireland', foundation: '1840' },
    { position: '3', company: 'Lavazza Coffee', location: 'Italy', foundation: '1895' },
    { position: '4', company: 'Peet’s Tea and Coffee', location: 'Emeryville, California, US', foundation: '1966' },
    { position: '5', company: 'Tully’s Coffee', location: 'Seattle, Washington, US', foundation: '1992' },
    { position: '6', company: 'Costa Coffee', location: 'Dunstable, England', foundation: '1971' },
    { position: '7', company: 'McCafe', location: 'Oak Brook, Illinois, United States', foundation: '1993' },
    { position: '8', company: 'Starbucks Coffee', location: 'Seattle, Washington, US', foundation: '1971' },
    { position: '9', company: 'Dunkin’ Donuts', location: 'Quincy, Massachusetts, US', foundation: '1950' },
    { position: '10', company: 'Coffee Beanery', location: 'Flushing, Michigan, US', foundation: '1976' }
  ];

  constructor(private poAlert: PoDialogService) {}

  searchMore(event: any) {
    window.open(`http://google.com/search?q=coffee+producing+${event.category}`, '_blank');
  }

  showMeTheDates(event: any) {
    this.poAlert.alert({
      title: 'Mês',
      message: `Fevereiro 2020`,
      ok: () => {}
    });
  }

}
