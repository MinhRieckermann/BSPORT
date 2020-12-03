import { NgModule } from "@angular/core";
import { CheckboxModule } from "primeng/checkbox";
import { ListboxModule } from "primeng/listbox";
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {RadioButtonModule} from 'primeng/radiobutton';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {StepsModule} from 'primeng/steps';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {PickListModule} from 'primeng/picklist';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {TooltipModule} from 'primeng/tooltip';
import {TabViewModule} from 'primeng/tabview';
import {MultiSelectModule} from 'primeng/multiselect';
@NgModule({
  exports: [ 
	ListboxModule,
    InputTextModule,
		ButtonModule,
		RadioButtonModule,
		InputTextareaModule,
		DropdownModule,
		ToastModule,
		StepsModule,
		TableModule,
		AutoCompleteModule,
		PickListModule,
		OverlayPanelModule,
		ConfirmDialogModule,
		TooltipModule,
		TabViewModule,
		MultiSelectModule
	],

})
export class PrimeModule {}
