import {test, expect, Page} from '@playwright/test'
import { Objects } from './objects'

export class PageManager{
    private readonly page : Page
    private readonly objects : Objects

    constructor(page : Page){
        this.page = page
        this.objects = new Objects(this.page)
    }

    onObjects(){
        return this.objects
    }

}