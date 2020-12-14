import { delay } from 'rxjs/operators';
import { AuthGuard } from './../auth/auth.guard';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  { path: '', component: HomeComponent,
  canActivate: [AuthGuard], 
  children: [
    {
      path: 'Brazil',
      loadChildren: () => import('./application/brazil/brazil.module')
        .then(mod => mod.BrazilModule)
    },
    {
      path: 'England',
      loadChildren: () => import('./application/england/england.module')
        .then(mod => mod.EnglandModule)
    },
    {
      path: 'Germany',
      loadChildren: () => import('./application/germany/germany.module')
        .then(mod => mod.GermanyModule)
    },
    {
      path: 'Italy',
      loadChildren: () => import('./application/italy/italy.module')
        .then(mod => mod.ItalyModule)
    },
    {
      path: 'Japan',
      loadChildren: () => import('./application/japan/japan.module')
        .then(mod => mod.JapanModule)
    },
    {
      path: 'Belgium',
      loadChildren: () => import('./application/belgium/belgium.module')
        .then(mod => mod.BelgiumModule)
    }
    ,
    {
      path: 'France',
      loadChildren: () => import('./application/france/france.module')
        .then(mod => mod.FranceModule)
    }
    ,
    {
      path: 'Denmark',
      loadChildren: () => import('./application/denmark/denmark.module')
        .then(mod => mod.DenmarkModule)
    }
    ,
    {
      path: 'Austria',
      loadChildren: () => import('./application/austria/austria.module')
        .then(mod => mod.AustriaModule)
    }
    ,
    {
      path: 'Portugal',
      loadChildren: () => import('./application/portugal/portugal.module')
        .then(mod => mod.PortugalModule)
    }
    ,
    {
      path: 'Russia',
      loadChildren: () => import('./application/russia/russia.module')
        .then(mod => mod.RussiaModule)
    }
    ,
    {
      path: 'Netherland',
      loadChildren: () => import('./application/netherland/netherland.module')
        .then(mod => mod.NetherlandModule)
    }
    ,
    {
      path: 'Paraguay',
      loadChildren: () => import('./application/paraguay/paraguay.module')
        .then(mod => mod.ParaguayModule)
    }
    ,
    {
      path: 'Serbia',
      loadChildren: () => import('./application/serbia/serbia.module')
        .then(mod => mod.SerbiaModule)
    }
    ,
    {
      path: 'Spain',
      loadChildren: () => import('./application/spain/spain.module')
        .then(mod => mod.SpainModule)
    }
    ,
    {
      path: 'Turkey',
      loadChildren: () => import('./application/turkey/turkey.module')
        .then(mod => mod.TurkeyModule)
    }
    ,
    {
      path: 'Ukraine',
      loadChildren: () => import('./application/ukraine/ukraine.module')
        .then(mod => mod.UkraineModule)
    }
    ,
    {
      path: 'Switzerland',
      loadChildren: () => import('./application/switzerland/switzerland.module')
        .then(mod => mod.SwitzerlandModule)
    }
    ,
    {
      path: 'Mexico',
      loadChildren: () => import('./application/mexico/mexico.module')
        .then(mod => mod.MexicoModule)
    }
    ,
    {
      path: 'Greece',
      loadChildren: () => import('./application/greece/greece.module')
        .then(mod => mod.GreeceModule)
    },
    {
      path: 'Ecuador',
      loadChildren: () => import('./application/ecuador/ecuador.module')
        .then(mod => mod.EcuadorModule)
    }
    ,
    {
      path: 'Peru',
      loadChildren: () => import('./application/peru/peru.module')
        .then(mod => mod.PeruModule)
    }
    ,
    {
      path: 'Scotland',
      loadChildren: () => import('./application/scotland/scotland.module')
        .then(mod => mod.ScotlandModule)
    }
  ]
}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
