import { test, expect, Page } from '@playwright/test'
import { HelperBase } from './helperBase';

export class Objects extends HelperBase{

    constructor(page : Page){
        super(page)
    }
}