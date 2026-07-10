import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/infrastructure/persistence/prisma/PrismaClient";

export async function GET() {

  try {

    const alerts =
      await prisma.alert.findMany({

        include: {

          disaster: true,


        },

        orderBy: {

          createdAt: "desc"

        }

      });

    return NextResponse.json(
      alerts,
      {
        status: 200
      }
    );

  } catch {

    return NextResponse.json(
      {
        error: "Internal Server Error"
      },
      {
        status: 500
      }
    );

  }

}

export async function POST(
  request: NextRequest
) {

  try {

    const body =
      await request.json();

    const alert =
      await prisma.alert.create({

        data: body,

        include: {

          disaster: true,


        }

      });

    return NextResponse.json(
      alert,
      {
        status: 201
      }
    );

  } catch {

    return NextResponse.json(
      {
        error: "Unable to create alert."
      },
      {
        status: 500
      }
    );

  }

}