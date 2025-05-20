/**
 * GitHub-themed icons for the snake game
 * This file handles the loading and rendering of the GitHub-themed food items
 */

class GithubIcons {
    constructor() {
        // SVG paths without fill attribute
        const svgPaths = {
            octocat: 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMGMtNi42MjYgMC0xMiA1LjM3My0xMiAxMiAwIDUuMzAyIDMuNDM4IDkuOCA4LjIwNyAxMS4zODcuNTk5LjExMS43OTMtLjI2MS43OTMtLjU3N3YtMi4yMzRjLTMuMzM4LjcyNi00LjAzMy0xLjQxNi00LjAzMy0xLjQxNi0uNTQ2LTEuMzg3LTEuMzMzLTEuNzU2LTEuMzMzLTEuNzU2LTEuMDg5LS43NDUuMDgzLS43MjkuMDgzLS43MjkgMS4yMDUuMDg0IDEuODM5IDEuMjM3IDEuODM5IDEuMjM3IDEuMDcgMS44MzQgMi44MDcgMS4zMDQgMy40OTIuOTk3LjEwNy0uNzc1LjQxOC0xLjMwNS43NjItMS42MDQtMi42NjUtLjMwNS01LjQ2Ny0xLjMzNC01LjQ2Ny01LjkzMSAwLTEuMzExLjQ2OS0yLjM4MSAxLjIzNi0zLjIyMS0uMTI0LS4zMDMtLjUzNS0xLjUyNC4xMTctMy4xNzYgMCAwIDEuMDA4LS4zMjIgMy4zMDEgMS4yMy45NTctLjI2NiAxLjk4My0uMzk5IDMuMDAzLS40MDQgMS4wMi4wMDUgMi4wNDcuMTM4IDMuMDA2LjQwNCAyLjI5MS0xLjU1MiAzLjI5Ny0xLjIzIDMuMjk3LTEuMjMuNjUzIDEuNjUzLjI0MiAyLjg3NC4xMTggMy4xNzYuNzcuODQgMS4yMzUgMS45MTEgMS4yMzUgMy4yMjEgMCA0LjYwOS0yLjgwNyA1LjYyNC01LjQ3OSA1LjkyMS40My4zNzIuODIzIDEuMTAyLjgyMyAyLjIyMnYzLjI5M2MwIC4zMTkuMTkyLjY5NC44MDEuNTc2IDQuNzY1LTEuNTg5IDguMTk5LTYuMDg2IDguMTk5LTExLjM4NiAwLTYuNjI3LTUuMzczLTEyLTEyLTEyeiIvPjwvc3ZnPg==',
            pullRequest: 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNNSAzYy0xLjEwNSAwLTIgLjg5NS0yIDJ2M2MwIDEuMTA1Ljg5NSAyIDIgMnMyLS44OTUgMi0yVjVjMC0xLjEwNS0uODk1LTItMi0yem0wIDJhMSAxIDAgMCAxIDEgMXYzYTEgMSAwIDEgMS0yIDBWNmExIDEgMCAwIDEgMS0xem0xMyAyYS45OTcuOTk3IDAgMCAwLS43MDcuMjkzTDExIDEzLjU4NVY5YzAtMS4xMDUtLjg5NS0yLTItMnYxMGMxLjEwNSAwIDItLjg5NSAyLTJ2LTEuNTg1bDYuMjkzIDYuMjkyQS45OTkuOTk5IDAgMCAwIDE5IDE3di03YS45OTkuOTk5IDAgMCAwLTEtMXptMCAxLjQxNFY1LjU4NkwxNy41ODYgMTB6Ii8+PC9zdmc+',
            issue: 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptMCAxOGMtNC40MiAwLTgtMy41OC04LThzMy41OC04IDgtOCA4IDMuNTggOCA4LTMuNTggOC04IDh6Ii8+PHBhdGggZD0iTTEyIDZhMiAyIDAgMSAwIDAgNCAxLjk5OSAxLjk5OSAwIDAgMCAwLTR6bTAgNmMtMi4zMzMgMC00LjY2NyAxLjE2Ny03IDMuNWwwIDAgMS43NSAxLjc1YzEuNzUtMS43NSAzLjUtMi4zMzMgNS4yNS0yLjMzM3MzLjUuNTgzIDUuMjUgMi4zMzNsMCAwIDEuNzUtMS43NUMxNi42NjcgMTMuMTY3IDE0LjMzMyAxMiAxMiAxMnoiLz48L3N2Zz4=',
            fork: 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNNSAzYTIgMiAwIDAgMC0yIDJ2NGEyIDIgMCAwIDAgMiAyaDIuNzMyQTcuMDA4IDcuMDA4IDAgMCAwIDEyIDE0YTcuMDA4IDcuMDA4IDAgMCAwIDQuMjY4LTNoMi43MzJhMiAyIDAgMCAwIDItMlY1YTIgMiAwIDAgMC0yLTJ6bTAgMmgxNHY0aC0yYy0uMDg3IDAtLjE2OC4wNDItLjIxOS4xMDlBNC45OTggNC45OTggMCAwIDEgMTIgMTJhNC45OTggNC45OTggMCAwIDEtNC43ODEtMi44OTFDNy4xNjggOS4wNDIgNy4wODcgOSA3IDlINXpNNSAxNWEyIDIgMCAwIDAtMiAydjJhMiAyIDAgMCAwIDIgMmgxNGEyIDIgMCAwIDAgMi0ydi0yYTIgMiAwIDAgMC0yLTJ6bTAgMmgxNHYySHV6Ii8+PC9zdmc+',
            star: 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMTcuMjdMMTguMTggMjFsLTEuNjQtNy4wM0wyMiA5LjI0bC03LjE5LS42MUwxMiAyIDkuMTkgOC42MyAyIDkuMjRsNS40NiA0LjczTDUuODIgMjF6Ii8+PC9zdmc+',
            commit: 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMmE5Ljk5IDkuOTkgMCAwIDAtOS45OSA5Ljk5YzAgNS41MyA0LjQ3IDkuOTkgOS45OSA5Ljk5IDUuNTMgMCA5Ljk5LTQuNDYgOS45OS05Ljk5QzIyIDYuNDcgMTcuNTIgMiAxMiAyem0wIDE4Yy00LjQyIDAtOC0zLjU4LTgtOHMzLjU4LTggOC04IDggMy41OCA4IDgtMy41OCA4LTggOHptMy41LTExYy44MyAwIDEuNS42NyAxLjUgMS41cy0uNjcgMS41LTEuNSAxLjUtMS41LS42Ny0xLjUtMS41LjY3LTEuNSAxLjUtMS41em0tNyAwYy44MyAwIDEuNS42NyAxLjUgMS41cy0uNjcgMS41LTEuNSAxLjUtMS41LS42Ny0xLjUtMS41LjY3LTEuNSAxLjUtMS41ek0xMiAxNS43NWMtMi4yNSAwLTMuOTYtMS41MS00LjUtMy41N2g5Yy0uNTQgMi4wNi0yLjI1IDMuNTctNC41IDMuNTd6Ii8+PC9zdmc+'
        };

        this.icons = {
            octocat: {
                img: null,
                path: svgPaths.octocat,
                points: 5
            },
            pullRequest: {
                img: null,
                path: svgPaths.pullRequest,
                points: 3
            },
            issue: {
                img: null,
                path: svgPaths.issue,
                points: 2
            },
            fork: {
                img: null,
                path: svgPaths.fork,
                points: 2
            },
            star: {
                img: null,
                path: svgPaths.star,
                points: 1
            },
            commit: {
                img: null,
                path: svgPaths.commit,
                points: 1
            }
        };

        // Create and preload all images
        this.loadImages();
    }

    // Load all SVG images with the current color scheme
    loadImages() {
        for (const key in this.icons) {
            // Create a new image for each icon
            this.icons[key].img = new Image();
            
            // Get the computed style for icon fill color
            const iconFill = getComputedStyle(document.documentElement).getPropertyValue('--icon-fill').trim();
            
            // Create SVG with dynamic fill
            const svgBase64 = this.icons[key].path;
            const svg = atob(svgBase64);
            const svgWithFill = svg.replace('<svg', `<svg fill="${iconFill}"`);
            const encodedSvg = btoa(svgWithFill);
            
            // Set the image source
            this.icons[key].img.src = 'data:image/svg+xml;base64,' + encodedSvg;
        }
    }

    // Get a random icon
    getRandomIcon() {
        const keys = Object.keys(this.icons);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        return {
            type: randomKey,
            img: this.icons[randomKey].img,
            points: this.icons[randomKey].points
        };
    }

    // Draw an icon on the canvas at the specified position
    drawIcon(ctx, icon, x, y, size) {
        if (icon && icon.img) {
            ctx.drawImage(icon.img, x, y, size, size);
        }
    }
}
