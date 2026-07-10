import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/infrastructure/persistence/prisma/PrismaClient";

export async function GET() {

  try {

    const agencies =
      await prisma.agency.findMany({

        include: {

          location: {

            include: {

              coordinates: true

            }

          }

        },

        orderBy: {

          createdAt: "desc"

        }

      });

    return NextResponse.json(
      agencies,
      {
        status: 200
      }
    );

  } catch {

    return NextResponse.json(
      {
        error:
          "Internal Server Error"
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

    const agency =
      await prisma.agency.create({

        data: body,

        include: {

          location: {

            include: {

              coordinates: true

            }

          }

        }

      });

    return NextResponse.json(
      agency,
      {
        status: 201
      }
    );

  } catch {

    return NextResponse.json(
      {
        error:
          "Unable to create agency."
      },
      {
        status: 500
      }
    );

  }

}