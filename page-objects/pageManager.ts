import {test, expect, Page} from '@playwright/test'
import { Elements } from './elements'
import { RadioButton } from './radioButton'
import { Alerts } from './alerts'
import { CheckBox } from './checkBox'

export class PageManager{
    private readonly page : Page
    private readonly elements : Elements
    private readonly radioButton : RadioButton
    private readonly alerts : Alerts
    private readonly checkBox : CheckBox

    constructor(page : Page){
        this.page = page
        this.elements = new Elements(this.page)
        this.radioButton = new RadioButton(this.page)
        this.alerts = new Alerts(this.page)
        this.checkBox = new CheckBox(this.page)
    }

    onElements(){
        return this.elements
    }

    onRadioButton(){
        return this.radioButton
    }

    onAlerts(){
        return this.alerts
    }

    onCheckBox(){
        return this.checkBox
    }

}