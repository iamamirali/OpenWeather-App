export class Loading {
    private data
    private container: HTMLElement

    setData(data) {
        this.data = data
    }

    setContainer(container) {
        this.container = container
    }

    toggleLoading(dataView: string) {
        if (!this.data) {
            this.container.innerHTML = `<div class="loading"><div/>`
        } else {
            this.container.innerHTML = dataView
            this.data = undefined
        }
    }
}